const express = require('express');
const route = express.Router();
const { createRole,updatepermission, getPermission, deletepermission} = require("../utility/permission");
const { authorizeUser } = require("../utility/auth");

route.get("/", (req, res)=> {
    res.send("welcome to express server ");
});

//create role
route.post('/role', authorizeUser, async(req, res) => {
    try {
        const rolecrt = await createRole({...req?.body, orgId:req?.user?.orgId});
        res.status(rolecrt?.statusCode).json(rolecrt);
    } catch (error) {
    console.log(error);
    res.status(500).json({sucess: false, message:"internal server error", error: error.message});
}
});
//update permission
route.put("/role/:id", authorizeUser, async (req, res) => {
    try{
       const roledisplay= await updatepermission(req?.params?.id, {...req?.body, orgId:req?.user?.orgId });
       console.log(roledisplay);
       res.status(roledisplay?.statusCode).json(roledisplay);
    }catch (error) {
        console.log(error);
       res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//get permission by id
route.get("/role/:id",authorizeUser, async (req, res)=> {
    try {
        const permissiondetails = await  getPermission(req?.params?.id);
      //  console.log(permissiondetails);
        res.status(permissiondetails?.statusCode).json(permissiondetails);
    }catch (error) {
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//delete permission 
route.delete("/role/:id", authorizeUser, async (req, res) => {
    try{
        const deleterole = await deletepermission(req?.params?.id);
        console.log(deleterole);
        res.status(deleterole?.statusCode).json(deleterole);
     }catch (error) {
         console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
     }
    });
    //get all permission
    route.get("/role",authorizeUser, async (req, res)=> {
        try {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
            const roledetails = await getPermission();
            console.log(roledetails);
            res.status(roledetails?.statusCode).json(roledetails);
        }catch (error) {
            console.log(error);
            res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
        }
    });

module.exports = route;
