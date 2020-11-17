import React, { createContext, useState, useContext } from 'react';
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
	const [user, setUser] = useState(null);

	const onSignIn = async (data) => {
		await api.loginUser(data)
			.then(res => {
				setUser(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});	
	}

	const onSignOut = async () => {
		setUser(null);
	}

	return {
		onSignIn,
		onSignOut,
		user
	}
}