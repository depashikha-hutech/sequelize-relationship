const db = require("../models/db");
const permission = require("../models/permission");
require("dotenv").config();
    //create role
    async function createRole(user){
    try{
        const roleinfo = await db.permissions.create(user)
        if(user){
           return {
               sucess: true,
               statusCode:200,
               message:"role created sucessfully",
               emp:roleinfo.get(),
           };
       } else{
           return{
           sucess: false,
           statusCode:500,
           message:"failed to update the role",
       }
    };
    } catch (error) {
        console.log(error);
           return({ sucess:false, statusCode: 400, message:"user not found", error: error.message });
        }
        }

    //update permission
    async function updatepermission(id, permission){
        try{
            const updatepermissioninfo = await db.permissions.update(permission, {where:{id}});
            console.log(updatepermissioninfo);
            if(permission){
               return {
                   sucess: true,
                   statusCode:200,
                   message:"updated sucessfully",
               };
           } else{
               return{
               sucess: false,
               statusCode:500,
               message:"failed to update the permission",
           }
        };
        } catch (error) {
            console.log(error);
               return({ sucess:false, statusCode: 400, message:"permission not updated", error: error.message });
            }
            }
    //
   // get permission
   async function getPermission(id = null) {
    try{
        const approval = await db.permissions.findAll({where: id ? { id } : {} });
        console.log({approval});
        if (approval.length > 0){
     return {
        sucess:true,
        statusCode: 200,
        message:"permission created sucessfully",
        per:id ? approval[0] : approval,
        };
    }else{
        return {
            sucess: true,
            statusCode:500,
            message:"permission not created",
        }
    };
   } catch (error) {
    console.log(error);
       return({ sucess:false, statusCode: 400, message:"user not found", error: error.message });
    }
    }
    //delete permission
    async function deletepermission(id){
        try{
            const deleterole =await db.permissions.destroy({ where: { id}});
            if(permission){
                return {
                    sucess: true,
                    statusCode:200,
                    message:"deleted sucessfully",
                };
            } else{
                return{
                sucess: false,
                statusCode:500,
                message:"failed to delete the role",
            }
         };
        } catch (error) {
            console.log(error);
            return({ sucess:false, statusCode: 400, message:"role not found", error:error.message});
        }
        }
    module.exports = {createRole,updatepermission,getPermission,deletepermission}