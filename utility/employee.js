const db = require("../models/db");
//const permission = require("../models/permission");
require("dotenv").config();
const env = process?.env


async function addEmployee(empData){
    try{
        const employeeinfo = await db.employee.create(empData)
        console.log({employeeinfo});
        if(empData){
           return {
               sucess: true,
               statusCode:200,
               message:"emp added sucessfully",
               emp:employeeinfo.get(),
           };
       } else{
           return{
           sucess: true,
           statusCode:500,
           message:"emp failed to signup",
       };
   }
    } catch (error){
        console.log(error);
        return{
           sucess:false,
           statusCode:500,
           message:"invalid emp",
           error:error.message,
        }
    }
   }
   async function getEmployee(id = null) {
    try{
        const usersdetails = await db.employee.findAll({where: id ? { id } : {},  });
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
    };
   } catch (error) {
    console.log(error);
       return({ sucess:false, statusCode: 400, message:"user not found", error: error.message });
    }
    }
    
        //update emp
        async function updateemployee(id, user){
            try{
                const updateinfo = await db.employee.update(user, {where:{id}});
                console.log(updateinfo);
                if(user){
                   return {
                       sucess: true,
                       statusCode:200,
                       message:"updated sucessfully",
                   };
               } else{
                   return{
                   sucess: false,
                   statusCode:500,
                   message:"failed to update the emp",
               }
            };
            } catch (error) {
                console.log(error);
                   return({ sucess:false, statusCode: 400, message:"user not updated", error: error.message });
                }
                }
//delet emp
async function deletedemp(id){
    try{
        const delUser =await db.employee.destroy({ where: { id}});
        if(delUser){
            return {
                sucess: true,
                statusCode:200,
                message:"deleted sucessfully",
            };
        } else{
            return{
            sucess: false,
            statusCode:500,
            message:"failed to delete the emp",
        }
     };
    } catch (error) {
        return({ sucess:false, statusCode: 400, message:"user not found", error:error.message});
    }
    }
    //


 async function addaddress(addressData){
     try{
         const addressinfo = await db.Address.create(addressData)
         console.log({addressinfo});
         if(addressData){
            return {
                sucess: true,
                statusCode:200,
                message:"emp added sucessfully",
                address:addressinfo.get(),
            };
        } else{
            return{
            sucess: true,
            statusCode:500,
            message:" failed to add address",
        };
    }
     } catch (error){
         console.log(error);
         return{
            sucess:false,
            statusCode:500,
           message:"invalid  address",
            error:error.message,
         }
     }
   }

module.exports = {addEmployee, getEmployee,updateemployee,deletedemp,addaddress}