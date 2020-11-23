const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
const UserCtrl = require('../controllers/user-ctrl');

const schema = buildASTSchema(gql`
	type Query {
		users: [User]
		user(id: ID): User
		roles: [Role]
		role(id: ID): Role
	}

	type Mutation {
		setRole(name: String): Role
	}

	type User {
		id: ID
		email: String
		username: String
		roles: [Role]
	}

	type Role {
		id: ID
		name: String
	}
`);

const rootValue = {
	users: () => UserCtrl.getUsers(),
	roles: () => UserCtrl.getRoles(),
	role: ({ id }) => UserCtrl.getRole(id),
	setRole: ({ name }) => UserCtrl.setRole(name)
}

module.exports = graphqlHTTP({ schema, rootValue });