const db = require("../models/db");
require("dotenv").config();
const env = process?.env


async function Createmeet(meeting){
    try{
        console.log("sssssssssssssssss" ,meeting);
        const meetinfo = await db.Metting.create(meeting)

        console.log({meetinfo});
        if(meeting){
           return {
               sucess: true,
               statusCode:200,
               message:"meet created sucessfully",
               meet:meetinfo,
           };
       } else{
           return{
           sucess: true,
           statusCode:500,
           message:"emp failed to create meet",
       };
   }
    } catch (error){
        console.log(error);
        return{
           sucess:false,
           statusCode:500,
           message:"invalid meet",
           error:error.message,
        }
    }
   }
   //update permission
   async function updatemeeting(id, meeting){
    try{
        const updatemeetinfo = await db.Metting.update(meeting, {where:{id}});
        if(meeting){
           return {
               sucess: true,
               statusCode:200,
               message:"updated sucessfully",
           };
       } else{
           return{
           sucess: false,
           statusCode:500,
           message:"failed to update the meetting",
       }
    };
    } catch (error) {
        console.log(error);
           return({ sucess:false, statusCode: 400, message:"meeting not updated", error: error.message });
        }
        }

// get permission
async function getmeeting(id = null) {
    try{
        const meeting = await db.Metting.findAll({where: id ? { id } : {} });
        if (meeting.length > 0){
     return {
        sucess:true,
        statusCode: 200,
        message:"meeting created sucessfully",
        meet:id ? meeting[0] : meeting,
        };
    }else{
        return {
            sucess: true,
            statusCode:500,
            message:"meeting not created",
        }
    };
   } catch (error) {
    console.log(error);
       return({ sucess:false, statusCode: 400, message:"meeting not found", error: error.message });
    }
    }
    //
    //delete permission
    async function deletemeeting(id){
        try{
            const deletemeet =await db.Metting.destroy({ where: { id}});
            console.log({deletemeet});
            if(deletemeet){
                return {
                    sucess: true,
                    statusCode:200,
                    message:"deleted sucessfully",
                };
            } else{
                return{
                sucess: false,
                statusCode:500,
                message:"role not found",
            }
         };
        } catch (error) {
            console.log(error);
                return({ sucess:false, statusCode: 400, message:"failed to delete the meeting", error:error.message});
        }
        }
   module.exports = {Createmeet, updatemeeting,getmeeting,deletemeeting}
