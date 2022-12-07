const db = require("../models/db");
require("dotenv").config();

async function addEmployee(empDetails){
    try{
        const employeeinfo = await db.employee.create(empDetails)
        console.log(employee);
        if(empDetails){
           return {
               sucess: true,
               statuscode:200,
               message:"emp added sucessfully",
               emp:employeeinfo.get(),
           };
       } else{
           return{
           sucess: true,
           statuscode:500,
           message:"emp failed to signup",
       };
   }
    } catch (error){
       //console.log(error);
        return{
           sucess:false,
           statuscode:500,
           message:"invalid emp",
           error:error.message,
        }
    }
   }
   async function getEmployee(id = null) {
    try{
        const usersdetails = await db.employee.findAll({where: id ? { id } : {} });
        if (usersdetails.length > 0){
     return {
         sucess:true, 
        statusCode: 200,
        message:"user created sucessfully", 
        emp:id ? usersdetails[0] : usersdetails,
        };
    }else{
        return {
            sucess: true,
            statusCode:500,
            message:"user not created",
        }
    }
   } catch (error) {
   // console.log(error);
       return({ sucess:false, statusCode: 400, message:"user not found", error: error.message });
    }
    }
    module.exports = {addEmployee,getEmployee}
