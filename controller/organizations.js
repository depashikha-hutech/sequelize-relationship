const express = require('express');
const route = express.Router();
const {addorganization, crtpermission} = require("../utility/organizations");
route.get("/", (req, res)=> {
    res.send("welcome to express server ");
});
route.post('/signup', async(req,res)=>{
    try{
    const{ orgDetails, empDetails} = req.body;
    //console.log(req.body);
    if( orgDetails){
    const crtorg = await addorganization(orgDetails);
    if(crtorg?.sucess){
        const permissioncreate = await crtpermission({orgId:crtorg?.orgs?.id, name:"Admin", permissions:{all:true}});
        if(permissioncreate?.sucess){
    }
    else{
        res.status(500).json("owner not get the permission")
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

