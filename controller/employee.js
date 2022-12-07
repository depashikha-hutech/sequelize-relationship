const express = require('express');
const route = express.Router();
const { addEmployee,getEmployee} = require("../utility/employee");
const { authorizeUser } = require("../utility/auth");

route.get("/", (req, res)=> {
    res.send("welcome to express server ");
});
route.post('/employee', authorizeUser, async(req,res)=>{
    try{
    const{  empDetails} = req.body;
    console.log(req.body);
const empcrt = await addEmployee({ orgId:crtorg?.orgs?.id,permissionId:permissioncreate?.permission?.id,...empDetails}); 
if(empcrt?.sucess){
   res.status(empcrt?.statuscode).json(empcrt);
}
else{
    res.status(500).json("org created but fail to create emp")
   }
} catch (error) {
    console.log(error);
    res.status(500).json({sucess: false, message:"internal server error"});
}
});
route.get("/:id", async (req, res)=> {
    try {
        let empinfo = await  getEmployee(req?.params?.id);
        res.status(empinfo?.statusCode).json(empinfo);
    }catch (error) {
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
module.exports = route;
