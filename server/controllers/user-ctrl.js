const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const Role = require('../models/role-model');
const bcrypt = require('bcryptjs');

initRole = () => {
	Role.estimatedDocumentCount((err, count) => {
		if(!err && count === 0) {
			new Role({
				name: 'user'
			}).save();

			new Role({
				name: 'admin'
			}).save();

			new Role({
				name: 'moderator'
			}).save();
		}
	});
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
		return res.status(400).json({ success: false, message: 'User exists!' });
	}
}

verifyToken = (req, res) => {
	let token = req.headers['x-access-token'];

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
		password: bcrypt.hashSync(req.body.password, 5)
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

module.exports = {
	initRole,
	userExists,
	verifyToken,
	signup
}