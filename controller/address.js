const express = require('express');
const { addaddress } = require('../utility/address');
const { addEmployee } = require('../utility/employee');
const route = express.Router();
const { authorizeUser } = require("../utility/auth");


//post 
route.post("/",authorizeUser, async (req, res) => {
  try { 
     const {empData,addressData } = req.body;
    if( empData && addressData){
         const crtemp = await addEmployee(empData);
         if(crtemp?.sucess){
           // const permissionCrt = await crtpermission({orgId:crtOrg?.orgs.id, name:"Admin", permissions:{All:true} });
            //console.log(permissionCrt);
            //if(permissionCrt?.sucess){
               const addresscrt = await addaddress({orgId:req?.user?.orgId,...addressData});
               if(addresscrt?.sucess){
                   //success
                    res.status(addresscrt?.statusCode).json(addresscrt);
               }else{
                   res.status(500).json("emp created but failed to add address")
               }
             }
             else {
          res.status(500).json("failed to create emp");
             }
        // }
         //else{
           //  res.status(crtemp?.statusCode).json(crtOrg);
       // }
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

module.exports = route;