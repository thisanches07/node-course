const Sequelize = require("sequelize");

const sequelize = new Sequelize("marketplace", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
