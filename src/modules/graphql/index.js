const graphql = require('graphql');
const {UserType, UserReturnType, AuthReturnType } = require('../users/schema'); 
const User = require('../users/models');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString, GraphQLSchema, GraphQLNonNull } = graphql;
const {addUser, loginUser, fetchUser, checkAuth  } = require('../users/resolver');

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
            email: { type: GraphQLString },
            token: { type: GraphQLString}
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
    },

    checkAuth: {
        type: AuthReturnType,
        args: {
                token: {type: GraphQLString},
        },
        resolve: (parent, args) => checkAuth(args.token)
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
