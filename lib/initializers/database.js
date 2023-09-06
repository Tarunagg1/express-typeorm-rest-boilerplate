const Sequelize = require('sequelize');
const SqlFormatter = require('sql-formatter');
const _ = require('lodash');
const Logger = require('../logger/logger');

const logger = Logger.getInstance();

module.exports = (config) => {
  const defaultSettings = {
    resetAfterUse: true,
    operatorsAliases: 0,
    dialectOptions: {
      connectTimeout: 30000,
      options: {
        requestTimeout: 8000
      }
    },
    pool: {
      maxConnections: Number.MAX_SAFE_INTEGER,
      maxIdleTime: 40000,
      max: 30,
      min: 0,
      idle: 30000,
      acquire: 30000
    },
    logging: (content) => {
      const parse = content.match(/^(Executing \(.*\):) (.*)$/);
      const prettySql = SqlFormatter.format(parse[2]);
      // logger.debug(`${parse[1]}\n${prettySql}`);
    }
  };
  // const sequelizeSettings = _.merge(defaultSettings, config.sequelizeConfig);
  // console.log(config.name, config.user, config.password, sequelizeSettings);

  const instance = new Sequelize(config.name, config.user, config.password, config.sequelizeConfig);

  instance.authenticate().then(() => {
    logger.info('Connected to database');
  }).catch((err) => {
    logger.error('Database connection error: %s', err);
  });

  return {
    instance,
    Sequelize
  };
};
