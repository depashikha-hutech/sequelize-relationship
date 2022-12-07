 const db = require("../models/db");
 const employee = require("../models/employee");
 const jwt = require("jsonwebtoken")


 async function createJWTToken(id, email,permission) {

     
     const token = jwt.sign({user:{ id, email,permission}} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    // console.log(token);
     return { idToken: token, refreshToken: "na" };
   }
   async function authorizeUser(req, res, next) {
    console.log("Authorizing user permission.....");
    next();
     const authHeader = req.headers["authorization"];
     console.log(authHeader);
     const tokeninfo = authHeader ? authHeader.split(" ")[1]: null
    // console.log({tokeninfo});
    if (tokeninfo == null) res.send(401);
     jwt.verify(tokeninfo, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
       if (err) { 
        res.send(401);
       } else {
     //  console.log(user);
       req.user = user;
       next();
       }
     });
    }
   module.exports = { createJWTToken,authorizeUser };
  