const db = require("../models/db");
require("dotenv").config();
const env = process?.env


async function addaddress(user){
    try{
        const addressinfo = await db.Address.create(user)
        console.log({addressinfo});
        if(addressinfo){
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
   module.exports = {addaddress}