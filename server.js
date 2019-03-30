require('dotenv').config();
const express = require("express");
const mainRoutes = require('./src/modules/index');
const { App } = require('./src/config');
const { middleware, database } = require('./src/lib');
const app = express();
const schema = require('./src/modules/users/schema');
const graphqlHTTP = require('express-graphql');

middleware(app);
mainRoutes(app);
database.connect();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(App.PORT, App.HOST, (e) => {
    if(e) {
     logger.error(e.message);
    }
    logger.info(`${App.NAME} running on ${App.HOST}:${App.PORT}`);
})
