const graphql = require('graphql');
const User = require('./models');

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        userName: { type: GraphQLString },
        mobile: { type: GraphQLString },
        email: { type: GraphQLString },
        image: { type: GraphQLString }
    }
});



module.exports = {
    UserType
}