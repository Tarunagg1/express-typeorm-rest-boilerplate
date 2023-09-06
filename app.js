require('dotenv').config();
const appServer = require('./lib/initializers/server');
const startExpresOptions = require('./lib/initializers/setup-express');

// const Routes = require('./app/routes/routes');
// const Models = require('./app/models/models');
// const Services = require('./app/services/services');
// const Middleware = require('./config/initializers/middleware');
// const SocketServer = require('./app/sockets/socketServer');


/**
 * Start Node Server
 */

const Server = new appServer();

const app = Server.start();


/**
 * Initialize Express
 */

startExpresOptions(app);



/**
 * Initialize Swagger Docs
 */