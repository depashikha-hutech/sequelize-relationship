const express = require('express');
const route = express.Router();
const { addEmployee, getEmployee,updateemployee, deletedemp} = require("../utility/employee");
const { authorizeUser } = require("../utility/auth");

route.post("/", authorizeUser, async(req, res) => {
    try {
        const crtemployee = await addEmployee({...req?.body, orgId:req?.user?.orgId});
        console.log({crtemployee});
        res.status(crtemployee?.statusCode).json(crtemployee);
    } catch (error) {
    console.log(error);
    res.status(500).json({sucess: false, message:"internal server error", error: error.message});
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
//get all employee
route.get("/",authorizeUser, async (req, res)=> {
    try {
        const employeedetails = await getEmployee();
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
