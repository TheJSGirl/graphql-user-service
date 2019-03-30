const schema = require('../users/schema'); 
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;

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

module.exports = new GraphQLSchema({
    query: RootQuery,
})