const express = require('express');
const { addorganization, crtEmp, crtpermission } = require("../utility/organization");
const route = express.Router();

//post 
route.post("/signup", async (req, res) => {
  try { 
     const { orgDetails, empData } = req.body;
    if(orgDetails && empData){
         const crtOrg = await addorganization(orgDetails);
         if(crtOrg?.sucess){
            const permissionCrt = await crtpermission({orgId:crtOrg?.orgs.id, name:"Admin", permissions:{All:true} });
            console.log(permissionCrt);
            if(permissionCrt?.sucess){
               const empCrt = await crtEmp({orgId:crtOrg?.orgs?.id, permissionId:permissionCrt?.permissions?.id,...empData});
               if(empCrt?.sucess){
                   //success
                    res.status(empCrt?.statusCode).json(empCrt);
               }else{
                   res.status(500).json("org created but failed to create user")
               }
             }
             else {
                 res.status(500).json("owner didn't get the access");
             }
         }
         else{
             res.status(crtOrg?.statusCode).json(crtOrg);
        }
    } 
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

module.exports = route;