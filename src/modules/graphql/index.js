const {UserType} = require('../users/schema'); 
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString, GraphQLSchema, GraphQLNonNull } = graphql;
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

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
  fields: {
    createUser: {
        type: UserType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString)},
        },
        resolve(parent, args) {
            let user = new User({
                name: args.name
            })
            return user.save();
        }
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