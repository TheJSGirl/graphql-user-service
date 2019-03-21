require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const validation = require('express-validation');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mainRoutes = require('./src/modules/index');
const { App } = require('./src/config');
const app = express();
const logger = log({ console:true, file: false, label: App.NAME });


app.use(bodyParser.json());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

mainRoutes(app);
app.use((err, req, res, next) => {
    if (err instanceof validation.ValidationError) {
        if (!err.message) {
            res.status(400).send()
        } else {
            res.status(400).json({
                status: 400,
                message: err,
            })
        }
    } else {
        
        if (err.message) {
            res.status(400)
                    .json({
                        status: err.status,
                        message: err.message,
                    });
        } else {
            res.status(400).json({
                status: 400,
                message: err,
            })
        }
    }
});

app.listen(App.PORT, App.HOST, (e) => {
    if(e) {
     logger.error(e.message);
    }
    logger.info(`${App.NAME} running on ${App.HOST}:${App.PORT}`);
})
