const {UserType, UserReturnType } = require('../users/schema'); 
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString, GraphQLSchema, GraphQLNonNull } = graphql;
const User = require('../users/models');
const {addUser, loginUser, fetchUser  } = require('../users/resolver');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                return fetchUser(args)
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

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
  fields: {
    createUser: {
        type: UserType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString)},
            password: { type: GraphQLString },
            userName: { type: GraphQLString },
            mobile: { type: GraphQLString },
            email: { type: GraphQLString }
        },
        resolve: (parent, args) => addUser(args)
    },

    loginUser: {
        type: UserReturnType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString)},
            password: { type: GraphQLString }
        },
        resolve: (parent, args) => loginUser(args)
    }
}


})
const gqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});

module.exports = {
    gqlSchema
}
