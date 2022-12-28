const express = require('express');
const route = express.Router();
const { addEmployee, getEmployee,updateemployee, deletedemp,addaddress} = require("../utility/employee");
const { authorizeUser } = require("../utility/auth");
const permission = require('../models/permission');

route.post("/", authorizeUser, async(req, res) => {
    try {
        const{empData,addressData}=req.body;
        if(empData && addressData){
        const crtemployee = await addEmployee({...empData, orgId:req?.user?.orgId});
        console.log({crtemployee});
        if (crtemployee?.sucess){
            const addresscrt = await addaddress({...addressData,empId:crtemployee?.emp?.id} );
            if(addresscrt?.sucess){
                res.status(addresscrt?.statusCode).json(addresscrt);
            }else{
                res.status(500).json("emp create but fail to add address ")
            }
        }else{
        res.status(crtemployee?.statusCode).json(crtemployee);
        }
    }
    } catch (error) {
    console.log(error);
    res.status(500).json({sucess: false, message:"internal server error", error: error.message});
}
});

route.get("/:id", async (req, res)=> {
    try {
        const empinfo = await  getEmployee(req?.params?.id);
        console.log(empinfo);
        res.status(empinfo?.statusCode).json(empinfo);
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//get all employee
route.get("/",authorizeUser, async (req, res)=> {
    try {
        const { offset=0, limit=null, e } = req.query;
       // console.log(offset, limit, e);
        const employeedetails = await getEmployee(offset, limit, e);
        console.log(employeedetails);
        res.status(employeedetails?.statusCode).json(employeedetails);
    
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});


//update employee

route.put("/:id", authorizeUser, async (req, res) => {
    try{
       const userdisplay = await updateemployee(req?.params?.id, {...req?.body, orgId:req?.user?.orgId });
       console.log(userdisplay);
       res.status(userdisplay?.statusCode).json(userdisplay);
    }catch (error) {
        console.log(error);
       res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//delete by id
route.delete("/:id", authorizeUser, async (req, res) => {
    try{
        const deleteemp = await deletedemp(req?.params?.id);
        console.log(deleteemp);
        res.status(deleteemp?.statusCode).json(deleteemp);
     }catch (error) {
         console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
     }

});


module.exports = route;
