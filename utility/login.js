const db = require("../models/db");
require("dotenv").config();
const env = process?.env
const employee = db.employee;
const {createJWTToken} =require("../utility/auth");


async function loginemp(email, password) {
    try{
         const userdetailsExist = await employee.findOne({ where:{ email, password },include:[{model:db.permissions, attributes:["id","name","permissions","orgId"]}]});
      //   console.log(userdetailsExist);
         const userDetails = userdetailsExist
         if (userDetails?.id) {
          const token =  await createJWTToken( userdetailsExist?.id, userdetailsExist?.email, userdetailsExist?.permission )
          return({ sucess: true,...token, statusCode:200, message: "user sucessfully login" });
         }else {
          return({ sucess: false, statusCode:401, message: "unauthorize" });
         }
      } catch (error) {
          return({ sucess:false, statusCode: 500, message:"internal server error", error:error.message});
  
      }
  }
module.exports= {loginemp}