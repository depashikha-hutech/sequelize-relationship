const express = require('express');
const route = express.Router();
const {addorganization, crtEmp, crtpermission} = require("../utility/organizations");
route.get("/", (req, res)=> {
    res.send("welcome to express server ");
});
route.post('/signup', async(req,res)=>{
    try{
    const{ orgDetails, empDetails} = req.body;
    console.log(req.body);
    if( orgDetails && empDetails){
    const crtorg = await addorganization(orgDetails);
    if(crtorg?.sucess){
        const permissioncreate = await crtpermission({orgId:crtorg?.orgs?.id, name:"Admin", permissions:{all:true}});
        if(permissioncreate?.sucess){
      const empcrt = await crtEmp({ orgId:crtorg?.orgs?.id,permissionId:permissioncreate?.permission?.id,...empDetails}); 
     if(empcrt?.sucess){
        res.status(empcrt?.statuscode).json(empcrt);
     }
     else{
      res.status(500).json("org created but fail to create emp")
     }
    }
    else{
        res.status(500).json("owner not get the")
    }
     } else {
        res.status(500).json("org not created");
    }
    } else{
        res.status(crtorg?.statuscode).json(crtorg);
    }
} catch (error) {
    res.status(500).json({sucess: false, message:"internal server error"});
}
});
module.exports = route;

