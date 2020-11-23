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
	role: ({ id }) => UserCtrl.getRole(id)
}

module.exports = graphqlHTTP({ schema, rootValue });