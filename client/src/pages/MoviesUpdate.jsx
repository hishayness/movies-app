import React, { Component } from 'react';
import styled from 'styled-components';

const Update = styled.div`
	color: #ef9b0f;
	cursor: pointer;
`;

const Delete = styled.div`
	color: #ff0000;
	cursor: pointer;
`;

class MoviesUpdate extends Component {
	render() {
		return (
			<div>
				<p>In this page you'll see the form to update the movie</p>
			</div>
		);
	}
}

export default MoviesUpdate;