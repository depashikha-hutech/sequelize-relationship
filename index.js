const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let db = require("./models/db");
const organizationroute = require("./controller/organizations");
const loginroute = require("./controller/login");


require("dotenv").config();
const cors = require("cors");
const port = process?.env?.port || 6001;

app.use(bodyParser.json());
app.use(cors());
db.sequelize
  .authenticate()
  .then(() => {
    console.error(
      `db connected to  ${ process?.env?.SERVERHOST || "NA" } database "${process?.env?.DBNAME || "NA"}"`
      )
     db.sequelize.sync({ force:true});
    })
  .catch((err) => {
    console.error(
      `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
      err
    );
    });

app.get("/", (req, res)=> {
    res.send("welcome to express server");
});
app.use("/org", organizationroute)
app.use("/org", loginroute)

app.listen(6001, ()=> {
        console.log("server running at port 6001"); 
});