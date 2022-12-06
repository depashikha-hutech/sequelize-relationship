const db = require("../models/db");
require("dotenv").config();
const env = process?.env

async function addorganization(orgDetails){
    try{
        const organizationsinfo = await db.Organization.create(orgDetails)
        if(orgDetails){
            return {
                sucess: true,
                statuscode:200,
                message:"org created sucessfully",
                orgs:organizationsinfo.get(),
            };
        } else{
            return{       
             sucess: true,
            statuscode:500,
            message:"failed to register",
        };
    }
    } catch (error){
        console.log(error);
         return{
            sucess:false,
            statuscode:500,
            message:"invalid org",
            error:error.message,
         }
    }
}


async function crtpermission(permissiondetails){
    try{
        const permissioninfo = await db.permissions.create(permissiondetails)
        if(permissiondetails){
            return {
                sucess: true,
                statuscode:200,
                message:"get permission sucesspermissiondetailsfully",
                permission:permissioninfo.get(),
            };
        } else{
            return{       
             sucess: true,
            statuscode:500,
            message:"permission not allowed",
        };
    }
    } catch (error){
        console.log(error);
         return{
            sucess:false,
            statuscode:500,
            message:" false permission ",
            error:error.message,
         }
    }
}
 async function crtEmp(empDetails){
     try{
         const employeeinfo = await db.employee.create(empDetails)
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
        console.log(error);
         return{
            sucess:false,
            statuscode:500,
            message:"invalid emp",
            error:error.message,
         }
     }
    }
module.exports ={addorganization, crtEmp, crtpermission}

