exports.data = {
  server: {
    port: process.env.PORT || 4000
  },
  database: {
    name: process.env.RDS_DBNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    sequelizeConfig: {
      dialect: 'mysql',
      port: 3306,
      host: process.env.RDS_HOSTNAME,
    }
  },
  secrets: {
    JWT: process.env.JWT_SECRET || 'asdf1234',
  },
  logger: {
    level: 2
  },
  STORJ_BRIDGE: 'https://api.storx.io'
  // STORJ_BRIDGE: 'http://localhost:6382'
  
};
