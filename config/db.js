// Database configs
module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db.sqlite'
  },
  production: {
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: true
    },
    define: {
      underscored: true
    }
  }
};
