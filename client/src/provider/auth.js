import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const authContext = createContext();

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	const onSignIn = async (data) => {
		await api.loginUser(data)
			.then(res => {
				localStorage.setItem('user', JSON.stringify(res?.data?.data));
				setUser(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});	
	}

	const onSignOut = async () => {
		localStorage.removeItem('user');
		setUser(null);
	}

	return {
		onSignIn,
		onSignOut,
		user
	}
}