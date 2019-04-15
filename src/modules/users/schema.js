const graphql = require('graphql');
const User = require('./models');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean} = graphql;

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

const UserReturnType = new GraphQLObjectType({
    name: 'UserReturn',
    fields: {
       user: { type: UserType },
       token : { type: GraphQLString }
    }
})


const PermissionType = new GraphQLObjectType({
    name: 'PermissionReturn',
    fields: {
        admin: {
            type: GraphQLBoolean
        }
    }
})
const AuthReturnType = new GraphQLObjectType({
    name: 'AuthReturn',
    fields: {
        authenticated:{ type: GraphQLBoolean},
        user:{ type: UserType },
        permission: { type: PermissionType }
    }
})

module.exports = {
    UserType,
    UserReturnType,
    AuthReturnType,
}
