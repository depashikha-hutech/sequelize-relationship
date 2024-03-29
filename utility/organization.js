const { Op } = require("sequelize");
const db = require("../models/db");
require("dotenv").config();
//const permission = require("../models/permission");
const env = process?.env

async function addorganization(orgDetails){
    try{
        const organizationsinfo = await db.Organization.create(orgDetails)
        if(orgDetails){
            return {
                sucess: true,
                statusCode:200,
                message:"org created sucessfully",
                orgs:organizationsinfo.get(),
            };
        } else{
            return{       
             sucess: true,
            statusCode:500,
            message:"failed to register",
        };
    }
    } catch (error){
        console.log(error);
         return{
            sucess:false,
            statusCode:500,
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
                statusCode:200,
                message:"org created sucessfully",
                emps:empinfo.get(),
            };
        } else{
            return{       
             sucess: true,
            statusCode:500,
            message:"failed to register",
        };
    }
    } catch (error){
        console.log(error);
         return{
            sucess:false,
            statusCode:500,
            message:"invalid org",
            error:error.message,
         }
    }
}

async function crtpermission(permissiondetails){
    try{
        const permissioninfo = await db.permissions.create(permissiondetails)
        console.log({permissioninfo});
        if(permissiondetails){
            return {
                sucess: true,
                statusCode:200,
                message:"get permission sucesspermissiondetailsfully",
                permissions:permissioninfo.get(),
            };
        } else{
            return{       
             sucess: true,
            statusCode:500,
            message:"permission not allowed",
        };
    }
    } catch (error){
        console.log(error);
         return{
            sucess:false,
            statusCode:500,
            message:" false permission ",
            error:error.message,
         }
    }
}

        //update emp
        async function updateorg(id, orgDetails){
            console.log(id, orgDetails);
            try{
                const updateinfo = await db.Organization.update(orgDetails?.orgDetails, {where:{id} ,returning : true});
                console.log(updateinfo);
                if(orgDetails){
                   return {
                       sucess: true,
                       statusCode:200,
                       message:"updated sucessfully",
                   };
               } else{
                   return{
                   sucess: false,
                   statusCode:500,
                   message:"failed to update the org",
               }
            };
            } catch (error) {
                console.log(error);
                   return({ sucess:false, statusCode: 400, message:"org not updated", error: error.message });
                }
                }

    
    async function getAllOrgData(offset, limit, s, id = null) {
        try {
          const getOrganisationDetails = await db.Organization.findAndCountAll({ where : id ? {id} :{[Op.or]:[{name :{
          [Op.iLike]:`%${s}%`,
           }}, {city: {
           [Op.iLike]:`%${s}`,
          }}, {state:{
           [Op.iLike]: `%${s}`
        }}] },  offset, limit, });
          console.log(getOrganisationDetails);
          if(getOrganisationDetails.count > 0 ){
            return {
               sucess: true,
               statusCode: 200,
               message: "organisation details",
               totalCount: getOrganisationDetails?.count,
               org: getOrganisationDetails?.rows,
            }
          } else {
            return {
                sucess: true,
                statusCode: 500,
            message: " organisation details not found",
        
            }
        }
        
        } catch (error) {
           console.log(error);
              return({ sucess:false, statusCode: 500, message:"organisation not found", error: error.message });
        }
}          
module.exports ={addorganization, crtEmp,  crtpermission,updateorg,getAllOrgData}