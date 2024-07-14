module.exports = {
  development: {
    username: "root",
    password: "Fuckyourass@3",
    database: "bitter",
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME || "default_username",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_DATABASE || "default_database",
    host: process.env.DB_HOST || "default_host",
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
};