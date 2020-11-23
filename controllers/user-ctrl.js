const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const Role = require('../models/role-model');
const bcrypt = require('bcryptjs');

initRole = () => {
	Role.estimatedDocumentCount((err, count) => {
		if(!err && count === 0) {
			new Role({ name: 'user' }).save();
			new Role({ name: 'admin' }).save();
			new Role({ name: 'moderator' }).save();
		}
	});
}

setRole = async name => {
	const role = new Role({
		name
	});

	try {
		return await role.save();
	}
	catch(err) {
		console.log(err);
	}
}

getUser = async (req, res) => {
	try {
		const _user = await User.findOne({ _id: req.userId }).populate('roles');

		if(_user) {
			return res.status(200).json({ 
				success: true, 
				data: {
					username: _user.username,
					email: _user.email,
					roles: _user.roles,
					id: _user._id
				}
			});
		}
		else {
			return res.status(404).json({ success: false, message: 'User not found!' });
		}
	}
	catch(err) {
		return res.status(500).json({ success: false, message: 'Bad request!' });
	}
}

getUsers = async () => {
	try {
		return await User.find({}).populate('roles');
	}
	catch(err) {
		throw err;
	}
}

getRole = async id => {
	try {
		return await Role.findOne({ _id: id });
	}
	catch(err) {
		throw err;
	}
}

getRoles = async () => {
	try {
		return await Role.find({});
	}
	catch(err) {
		throw err;
	}
}

userExists = async (req, res, next) => {
	try {
		const [username, email] = await Promise.all([
			User.findOne({ username: req.body.username }),
			User.findOne({ email: req.body.email })
		]);

		if(username || email) {
			return res.status(400).json({ success: false, message: 'User exists!' });
		}

		next();
	}
	catch(err) {
		return res.status(500).json({ success: false, message: 'Bad request!' });
	}
}

verifyToken = (req, res, next) => {
	let token = req.cookies['token'];

	if(!token) {
		return res.status(403).send({ message: 'No token provided' });
	}

	jwt.verify(token, 'secret', (err, decoded) => {
		if(err) {
			return res.status(401).send({ message: 'Unauthorized!' });
		}

		req.userId = decoded.id;

		next();
	});
}

signup = async (req, res) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	});

	try {
		const _user = await user.save();
		const _role = await Role.findOne({ name: 'user' });

		if(!_role) {
			return res.status(400).json({ success: false, message: 'User not created! '});			
		}

		_user.roles = [_role._id];
		await _user.save();

		return res.status(200).json({ success: true, message: 'User created!' });
	}
	catch(err) {
		return res.status(400).json({ success: false, message: 'User not created! '});		
	}
}

login = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username }).populate('roles');

		if(!user) {
			return res.status(400).json({ success: false, message: 'User not found! '});
		}

		if(!bcrypt.compareSync(req.body.password, user.password)) {
			return res.status(400).json({ success: false, message: 'Password invalid! '});			
		}

		let token = jwt.sign({ id: user._id }, 'secret', { expiresIn: 86400 });

		return res.cookie('token', token, { httpOnly: true }).status(200).json({
			success: true,
			data: {
				username: user.username,
				email: user.email,
				roles: user.roles,
				id: user._id
			}
		})
	}
	catch(err) {
		console.log(err);
		return res.status(400).json({ success: false, message: 'Could not login! '});
	}
}

module.exports = {
	initRole,
	userExists,
	verifyToken,
	signup,
	login,
	getUser,
	getUsers,
	getRole,
	getRoles,
	setRole
}