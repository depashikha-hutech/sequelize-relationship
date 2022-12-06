let Sequelize = require("sequelize");
require("dotenv")?.config();
const env = process?.env
const sequelize = new Sequelize(
  env.DBNAME,
  env.DBUSERNAME,
  env.DBPASSWORD,
  {
    host: env.DBHOST,
    dialect: "postgres",
    operatorsAliases: 0,
    logging: false,
    reconnect: {
      max_retries: 5,
      onRetry: function (count) {
        console.log("connection lost, trying to reconnect (" + count + ")");
      },
    },
    pool: {
      max: 5,
      min: 0,
    },
  }
);
const db = {
  sequelize,
  Sequelize,
  
  Organization: require("../models/organization")(sequelize, Sequelize),
  employee: require("../models/employee")(sequelize,Sequelize),
  Address: require("../models/address")(sequelize,Sequelize),
  Metting: require("../models/metting")(sequelize,Sequelize),
  permissions: require("../models/permission")(sequelize,Sequelize),

};
db.Organization .hasMany(db.employee,{ 
    foreignKey:'orgId',
    targetkey:'id'
});
db.permissions.hasMany(db.employee,
  {
    foreignKey:'permissionId',
    targetkey:'id'
  });
  db.Organization.hasMany(db.permissions,{
    foreignKey:'orgId',
    targetkey:'id'
  });


module.exports = db;