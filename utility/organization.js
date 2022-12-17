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

async function crtEmp(empData){
    try{
        const empinfo = await db.employee.create(empData)
        if(empData){
            return {
                sucess: true,
                statuscode:200,
                message:"org created sucessfully",
                emps:empinfo.get(),
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
       // console.log({permissioninfo});
        if(permissiondetails){
            return {
                sucess: true,
                statuscode:200,
                message:"get permission sucesspermissiondetailsfully",
                permissions:permissioninfo.get(),
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
 
module.exports ={addorganization, crtEmp,  crtpermission}
 