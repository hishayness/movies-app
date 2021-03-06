import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api';

const Title = styled.h1.attrs({
	className: 'h1'
})``;

const Label = styled.label`
	margin: 5px;
`;

const InputText = styled.input.attrs({
	className: 'form-control'
})`
	margin: 5px;
`;

const Button = styled.button.attrs({
	className: 'btn btn-primary'
})`
	margin: 15px 15px 15px 5px;
`;

const Join = props => {
	const defaults = {
		username: '',
		password: '',
		email: ''
	}
	
	const [data, setData] = useState(defaults);

	const handleOnSubmit = e => {
		if(e) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	const handleInputChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value
		});		
	}

	const handleJoin = async e => {
		await api.registerUser(data)
			.then(res => {
				setData(defaults);
			})
			.catch(err => {
				console.log(err);
			});		
	}

	return (<>
		<Title>Join</Title>
		<form onSubmit={handleOnSubmit}>
			<Label>Username:</Label>
			<InputText
				type="text"
				name="username"
				value={data?.username}
				onChange={handleInputChange}
			/>		
			<Label>Password:</Label>
			<InputText
				type="password"
				name="password"
				value={data?.password}
				onChange={handleInputChange}
			/>		
			<Label>Email:</Label>
			<InputText
				type="text"
				name="email"
				value={data?.email}
				onChange={handleInputChange}
			/>					
			<Button onClick={handleJoin}>Submit</Button>
		</form>
	</>);
}

export default Join;