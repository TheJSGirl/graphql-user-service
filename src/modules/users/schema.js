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

const UserReturnType = new GraphQLObjectType({
    name: 'UserReturn',
    fields: {
       user: { type: UserType },
       token : { type: GraphQLString }
    }
})

const ResponseReturnType = new GraphQLObjectType({
    name: 'ResponseReturnType',
    fields: {
      response: {
        authenticated: GraphQLBoolean,
        user:
         { id: GraphQLString,
           email: GraphQLString,
           iat: GraphQLInt,
           exp: GraphQLInt 
        },
        permission: { GraphQLObjectType } 
      }
     
    }
});

const AuthReturnType = new GraphQLObjectType({
    name: 'AuthReturn',
    fields: {
       response: { type: ResponseReturnType }
    }
})

module.exports = {
    UserType,
    UserReturnType,
    AuthReturnType,
    ResponseReturnType
}