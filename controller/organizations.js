const express = require('express');
const route = express.Router();
const {addorganization,crtEmp, crtpermission} = require("../utility/organization");
route.get("/", (req, res)=> {
    res.send("welcome to express server ");
});
route.post('/signup', async(req,res)=>{
   try{
    const{ orgDetails, empData} = req.body;
   // console.log(req.body);
    if( orgDetails && empData){
    const crtorg = await addorganization(orgDetails);
   // console.log(crtorg);
    if(crtorg?.sucess){
        const permissioncreate = await crtpermission({orgId:crtorg?.orgs?.id, name:"Admin", permissions:{all:true}});
       // console.log({permissioncreate});
        if(permissioncreate?.sucess){
        //console.log({permissioncreate});
            const empcrt = await crtEmp({orgId:crtorg?.orgs?.id, permissionId:permissioncreate?.permissions?.id,...empData});
            console.log(empcrt);
            if(empcrt?.sucess){
                res.status(empcrt?.statuscode).json(empcrt);
            }

    else{
        res.status(500).json("organisation created but failed to create user")
    }
 } else{
    res.status(500).json("owner not get the permission");

    }
    } else{
        res.status(crtorg?.statuscode).json(crtorg);
    }
    }
} catch (error) {
    console.log(error);
    res.status(500).json({sucess: false, message:"internal server error"});
}
});

module.exports = route;

