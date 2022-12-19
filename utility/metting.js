const db = require("../models/db");
require("dotenv").config();
const env = process?.env


async function crtmeet(meeting){
    try{
        console.log("sssssssssssssssss");
        const meetinfo = await db.Metting.create(meeting)
        
        console.log({meetinfo});
        if(meeting){
           return {
               sucess: true,
               statusCode:200,
               message:"meet created sucessfully",
               meet:meetinfo.get(),
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
   module.exports = {crtmeet}
