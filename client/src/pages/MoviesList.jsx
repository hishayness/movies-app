import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

import api from '../api';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const Delete = styled.div`
	color: #ff0000;
	cursor: pointer;
`;

const DeleteMovie = ({ id }) => {
	const deleteUser = async e => {
		e.preventDefault();

//		if(window.confirm(`Do you want to delete the movie ${id} permanently`)) {
			await api.deleteMovieById(id)
				.then(res => {
					window.location.reload();
				})
//		}
	}

	return <Delete onClick={deleteUser}>Delete</Delete>;
}

const Wrapper = styled.div`
	padding: 0 40px 40px 40px;
`;

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

	function Table({columns, data}) {

		const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data})

		// Render Data Table UI
		return (
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup
								.headers
								.map(column => (
									<th {...column.getHeaderProps()}>{column.render('Header')}</th>
								))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row
									.cells
									.map(cell => {
										return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									})}
							</tr>
						)
					})}
				</tbody>
			</table>
		)
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
		},
		{
			Header: '',
//			accessor: '',
			Cell: props => {
				return (
					<span>
						<DeleteMovie id={props.orignal._id} />
					</span>
				)
			}
		}
	]

	let showTable = true;

	if(!movies.length) {
		showTable = false;
	}

	return (
		<Wrapper>
			{showTable && <Styles><Table columns={columns} data={movies} /></Styles>}
		</Wrapper>
	)
}

export default MoviesList;