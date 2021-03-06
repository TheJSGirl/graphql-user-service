require('dotenv').config();
const express = require("express");
const mainRoutes = require('./src/modules/index');
const { App } = require('./src/config');
const { middleware, database } = require('./src/lib');
const app = express();
const {gqlSchema} = require('./src/modules/graphql');
const graphqlHTTP = require('express-graphql');

//middleware(app);
//mainRoutes(app);
database.connect();

app.use('/graphql', graphqlHTTP({
    schema: gqlSchema,
    graphiql: true
}));

app.listen(App.PORT, App.HOST, (e) => {
    if(e) {
     logger.error(e.message);
    }
    logger.info(`${App.NAME} running on ${App.HOST}:${App.PORT}`);
})
