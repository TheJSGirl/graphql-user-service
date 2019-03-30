const {UserType} = require('../users/schema'); 
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLSchema } = graphql;
const User = require('../users/models');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                return User.findById(args.id)
            }
        },
        users: {
            type: GraphQLList(UserType),
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                return User.find();
            }
        }
    }
});

const gqlSchema = new GraphQLSchema({
    query: RootQuery,
});

module.exports = {
    gqlSchema
}