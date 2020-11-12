import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div.attrs({
	className: 'collapse navbar-collapse'
})``;

const List = styled.div.attrs({
	className: 'navbar-nav mr-auto'
})``;

const Item = styled.div.attrs({
	className: 'collapse navbar-collapse'
})``;

class Links extends Component {
	render() {
		return (
			<>
				<Link to="/" className="navbar-brand">
					Online Movie Search
				</Link>
				<Collapse>
					<List>
						<Item>
							<Link to="/movies/list" className="nav-link">
								List Movies
							</Link>
						</Item>
						<Item>
							<Link to="/movies/create" className="nav-link">
								Create Movie
							</Link>
						</Item>						
						<Item>
							<Link to="/movies/search" className="nav-link">
								Search Movie
							</Link>
						</Item>	
						<Item>
							<Link to="/join" className="nav-link">
								Join
							</Link>
						</Item>		
						<Item>
							<Link to="/login" className="nav-link">
								Login
							</Link>
						</Item>																		
					</List>
				</Collapse>
			</>
		)
	}
}

export default Links;
