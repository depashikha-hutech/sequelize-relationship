const express = require('express');
const route = express.Router();
const { createRole,updatepermission, getPermission, deletepermission} = require("../utility/permission");
const { authorizeUser } = require("../utility/auth");


//create role
route.post('/', authorizeUser, async(req, res) => {
    try {
        const rolecrt = await createRole({...req?.body, orgId:req?.user?.orgId});
        res.status(rolecrt?.statusCode).json(rolecrt);
    } catch (error) {
    console.log(error);
    res.status(500).json({sucess: false, message:"internal server error", error: error.message});
}
});
//update permission
route.put("/:id", authorizeUser, async (req, res) => {
    try{
       const roledisplay= await updatepermission(req?.params?.id, {...req?.body, orgId:req?.user?.orgId });
       res.status(roledisplay?.statusCode).json(roledisplay);
    }catch (error) {
        console.log(error);
       res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//get permission by id
route.get("/:id",authorizeUser, async (req, res)=> {
    try {
        const permissiondetails = await  getPermission(req?.params?.id);
        res.status(permissiondetails?.statusCode).json(permissiondetails);
    }catch (error) {
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//delete permission 
route.delete("/:id", authorizeUser, async (req, res) => {
    try{
        const deleterole = await deletepermission(req?.params?.id);
        res.status(deleterole?.statusCode).json(deleterole);
     }catch (error) {
         console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
     }
    });
    //get all permission
    route.get("/",authorizeUser, async (req, res)=> {
        try {
            const roledetails = await getPermission();
            res.status(roledetails?.statusCode).json(roledetails);
        }catch (error) {
            console.log(error);
            res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
        }
    });

module.exports = route;
