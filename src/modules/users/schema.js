const graphql = require('graphql');
const User = require('./models');

const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    password: GraphQLString,
    userName: GraphQLString,
    mobile: GraphQLString,
    email: GraphQLString
});



module.exports = {
    UserType
}