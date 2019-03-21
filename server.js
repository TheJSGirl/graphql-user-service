const express = require("express");
require('dotenv').config();
const mainRoutes = require('./src/modules/index');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const logger = log({ console:true, file: false });
const validation = require('express-validation');
app.use(bodyParser.json());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

mainRoutes(app);
app.use((err, req, res, next) => {
    console.log(err)
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

app.get('/', (req, res) => {
    console.log("here");
    res.send('ok')
})  

app.listen(3000, (req, res) => {
    console.log(`listing at port 3000`)
})
