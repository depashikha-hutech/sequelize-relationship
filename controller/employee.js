const express = require('express');
const route = express.Router();
const { addEmployee, getEmployee,updateemployee, deletedemp} = require("../utility/employee");
const { authorizeUser } = require("../utility/auth");

route.get("/", (req, res)=> {
    res.send("welcome to express server ");
});
route.post("/employee", authorizeUser, async(req, res) => {
    try {
        const crtemp = await addEmployee({...req?.body, orgId:req?.user?.orgId});
        console.log(crtemp);
        res.status(crtemp?.statusCode).json(crtemp);
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

//update employee

route.put("/employee/:id", authorizeUser, async (req, res) => {
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
route.delete("/employee/:id", authorizeUser, async (req, res) => {
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
