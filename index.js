const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let db = require("./models/db");
const organizationroute = require("./controller/organizations");
const loginroute = require("./controller/login");
const employeeroute = require("./controller/employee");
const permissionroute = require("./controller/permission");
const meetingroute = require("./controller/metting");
const mediaroute = require ("./controller/media");
const addressroute = require ("./controller/address");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const port = process?.env?.port || 6001;
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());
db.sequelize
  .authenticate()
  .then(() => {
    console.error(
      `db connected to  ${ process?.env?.SERVERHOST || "NA" } database "${process?.env?.DBNAME || "NA"}"`
      )
//   db.sequelize.sync({ force:true});
    })
  .catch((err) => {
    console.error(
      `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
      err
    );
    });


app.use("/api/v1/org", organizationroute)
app.use("/api/v1/org", loginroute)
app.use("/api/v1/employee",employeeroute)
app.use("/api/v1/role",permissionroute)
app.use("/api/v1/meet",meetingroute)
app.use("/api/v1/media",mediaroute)
app.use("/api/v1/address",addressroute)

app.listen(6001, ()=> {
        console.log("server running at port 6001"); 
});