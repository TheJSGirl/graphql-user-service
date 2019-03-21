const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const { App } = require('./../../config');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const { responseParser }= require('./format');
const isProd = App.env === 'production';
const isDev = App.env === 'development';

const logger = log({ console: true, file: false, label: App.NAME });

module.exports = async(app) => {
    
    app.use(cors());
    
    if(isProd) {
        app.use(helmet());
        app.use(compression());
    }
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(ExpressAPILogMiddleware(logger, { request: true }));
    app.use(responseParser);
};
