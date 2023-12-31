const express = require('express');
const Logger = require('../logger/logger');
const Config = require('../config');
const Database = require('./database');

/**
 * Instance of Server application
 * @param {Config} config
 */

class Server {
  constructor() {
    this.config = Config.getInstance();
    this.logger = Logger.getInstance();
    this.app = express();
    this.router = express.Router();
    this.instance = null;
    this.database = null;
    this.models = null;
    this.services = null;
    this.routes = null;
  }

  start() {
    this.app.use(express.json());

    const port = this.config.get('server:port');

    this.logger.info(`Starting Server on port ${port}`);
    this.logger.info(`Environment: "${process.env.NODE_ENV}"`);
    this.instance = this.app.listen(port, '0.0.0.0');
    this.instance.timeout = 240000
    this.initDatabase();

    process.on('SIGINT', this.handleSIGINT.bind(this));
    process.on('exit', this.handleExit.bind(this));
    process.on('uncaughtException', this.handleuncaughtException.bind(this));

    this.logger.info(`API started on: http://localhost:${port}`);

    return this.app;
  }

  handleuncaughtException(err) {
    this.logger.info('Unhandled exception: %s\n%s', err.message, err.stack);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  handleExit() {
    this.logger.info('Server is shutting down');
  }

  handleSIGINT() {
    const { logger } = this;
    logger.info('Server received shutdown request, waiting for pending requests');
    this.instance.close(() => {
      logger.info('Finished all requests');
      process.exitCode = 0;
    });
  }

  initDatabase() {
    this.logger.info('Connecting to database');
    this.database = Database(this.config.get('database'));
  }

  // initModels(Models) {
  //   this.logger.info('Initializing Models');
  //   this.models = Models(this.database, this);
  //   this.logger.info('Models OK');
  // }

  initServices(Services) {
    this.logger.info('Initializing services');
    this.services = Services(this.models, this);
    this.logger.info('Services OK');
  }

  // initMiddleware(Middleware) {
  //   this.logger.info('Initializing middlewares');
  //   Middleware(this, this.config.get('secrets'));
  //   this.logger.info('Middleware OK');
  // }


  // initRoutes(Router) {
  //   const routesPrefix = '/api';
  //   this.logger.info(`Initializing and mounting routes to ${routesPrefix}`);
  //   this.routes = Router(this.router, this.services, this);
  //   this.express.use(routesPrefix, this.routes);
  //   this.logger.info('Routes OK');
  // }
}

module.exports = Server;