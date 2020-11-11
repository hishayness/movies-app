import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api';
import Table from '../components/Table';

const Title = styled.h1.attrs({
	className: 'h1'
})``;

const MoviesSearch = props => {
	const [movies, setMovies] = useState([]);

	const handleSearchMovie = async e => {
		await api.searchMovies(e.target.value)
			.then(res => {
				setMovies(res.data.data);
			})
	}

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

	return (<div>
		<Title>Search Movies</Title>
		<input type="text" onChange={handleSearchMovie} />
		{movies?.length > 0 && <Table columns={columns} data={movies} />}
	</div>);
}

export default MoviesSearch;