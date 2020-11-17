import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../provider/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { user } = useAuth();

	if(user) {
		return <Component />
	}
	else {
		return <Redirect to={{ pathname: "/login" }} />
	}
}

export default ProtectedRoute;