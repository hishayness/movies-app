import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Table from '../components/Table';

import api from '../api';

const Title = styled.h1.attrs({
	className: 'h1'
})``;

const Delete = styled.div`
	color: #ff0000;
	cursor: pointer;
`;

const DeleteMovie = ({ id }) => {
	const deleteUser = async e => {
		e.preventDefault();

		if(window.confirm(`Do you want to delete the movie ${id} permanently`)) {
			await api.deleteMovieById(id)
				.then(res => {
					window.location.reload();
				})
		}
	}

	return <Delete onClick={deleteUser}>Delete</Delete>;
}

const MoviesList = props => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsloading] = useState(false);

	useEffect(() => {
		setIsloading(true);

		async function fetchData () {
			await api.getAllMovies().then(movies => {
				setMovies(movies.data.data);
				setIsloading(false);
			})		
		}

		fetchData();
	}, []);


	const columns = [
		{
			Header: 'ID',
			accessor: '_id',
			filterable: true
		},
		{
			Header: 'Name',
			accessor: 'name',
			filterable: true
		},
		{
			Header: 'Rating',
			accessor: 'rating',
			filterable: true
		},
		{
			Header: 'Time',
			accessor: 'time',
			Cell: props => <span>{props.value.join(' / ')}</span>
		}
	]

	let showTable = true;

	if(!movies.length) {
		showTable = false;
	}

	return (
		<div>
			<Title>List Movie</Title>
			{showTable && <Table columns={columns} data={movies} />}
		</div>
	)
}

export default MoviesList;