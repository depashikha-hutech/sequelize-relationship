 const db = require("../models/db");
 const employee = require("../models/employee");
 const jwt = require("jsonwebtoken");


 async function createJWTToken(id, email,permission) {

     const token = jwt.sign({user:{ id, email,permission}} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: "9h" });
     console.log(token);
     return { idToken: token, refreshToken: "na" };
   }
   async function authorizeUser(req, res, next) {
    console.log("*********************************");
    //console.log("Authorizing user permission.....");
       const Method = req.method;
       const Endpoint = req.url;

     const authHeader = req.headers["authorization"];
     const tokeninfo = authHeader ? authHeader.split(" ")[1] : null;

    if (tokeninfo == null) res.sendStatus(401);
     jwt.verify(tokeninfo, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
       if (err) { 
        res.sendStatus(401);
       } else {
        //console.log(user?.user?.permission?.permissions);
        const permissionsinfo=user?.user?.permission?.permissions;
        let hasPermissions=false;
        console.log({Method});
        console.log({Endpoint});
        switch (Endpoint) {
          case '/employee':

            if(Method==='POST'){
              console.log(permissionsinfo?.all || permissionsinfo?.EMP_CRT); 
              if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
              hasPermissions=true
            }
            //else  if(Method==='GET'){
              //if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
              //hasPermissions=true
            //}
           // else if(Method==='PUT'){
             // if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
             // console.log(permissionsinfo?.EMP_CRT);
              //hasPermissions=true
           // }
            //else if(Method==='DELETE'){
              //if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
              //hasPermissions=true
            //}
            break;    
            case '/role':
              console.log("lololoos");
            if(Method==='POST'){
             console.log("yyyyyyyyy");

              if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
              hasPermissions=true
            }
            else  if(Method==='GET'){
              console.log("kkkkkk");
              if(permissionsinfo?.all || permissionsinfo?.EMP_CRT )
              hasPermissions=true
            }
            else if(Method==='PUT'){
              console.log("mmmmmmmm");
              if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
              hasPermissions=true
            }
            else if(Method==='DELETE'){
              if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
              console.log(permissionsinfo?.all || permissionsinfo?.EMP_CRT);
              hasPermissions=true
            }
            break;
            //meet
            case '/meet':
              console.log("lololoos");
            if(Method==='POST'){
             console.log("yyyyyyyyy");

              if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
              hasPermissions=true
            }
            else  if(Method==='GET'){
              console.log("kkkkkk");
              if(permissionsinfo?.all || permissionsinfo?.EMP_CRT )
              hasPermissions=true
            }
            else if(Method==='PUT'){
              console.log("mmmmmmmm");
              if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
              hasPermissions=true
            }
            else if(Method==='DELETE'){
              if(permissionsinfo?.all || permissionsinfo?.EMP_CRT)
              console.log(permissionsinfo?.all || permissionsinfo?.EMP_CRT);
              hasPermissions=true
            }
            break;
              default :{
                if(Method===req.method && Endpoint.includes("/employee/")&& Endpoint.length===46 && (permissionsinfo?.all || permissionsinfo?.EMP_CRT)){
                }
                hasPermissions=true
              }
            }


        if(hasPermissions){
       req.user = {...user?.user,orgId:user?.user?.permission?.orgId}
         next();
        }else{
          res.sendStatus(401);
        }

      }
    
     });
   }
   module.exports = { createJWTToken,authorizeUser };
  