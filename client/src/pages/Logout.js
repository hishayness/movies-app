import React, { useEffect } from 'react';
import { useAuth } from '../provider/auth';
import { useHistory } from "react-router-dom";

const Logout = props => {
	const auth = useAuth();
	const history = useHistory();

	useEffect(() => {
		auth.onSignOut();
		history.push('/');
	}, []);

	return (<></>);
}

export default Logout;