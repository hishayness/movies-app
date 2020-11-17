import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../provider/auth';

const Collapse = styled.div.attrs({
	className: 'collapse navbar-collapse'
})``;

const List = styled.div.attrs({
	className: 'navbar-nav mr-auto'
})``;

const Item = styled.div.attrs({
	className: 'collapse navbar-collapse'
})``;

const Links = () => {
	const { user } = useAuth();

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
					{user && <Item>
						<Link to="/movies/create" className="nav-link">
							Create Movie
						</Link>
					</Item>}					
					<Item>
						<Link to="/movies/search" className="nav-link">
							Search Movie
						</Link>
					</Item>	
					{!user && <Item>
						<Link to="/join" className="nav-link">
							Join
						</Link>
					</Item>}
					{!user && <Item>
						<Link to="/login" className="nav-link">
							Login
						</Link>
					</Item>}
					{user && <Item>
						<Link to="/logout" className="nav-link">
							Logout
						</Link>
					</Item>}																						
				</List>
			</Collapse>
		</>
	);
}

export default Links;