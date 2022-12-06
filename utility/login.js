const db = require("../models/db");
require("dotenv").config();
const env = process?.env
const employee = db.employee;
const {createJWTToken} =require("../utility/auth");


async function loginemp(email, password) {
    try{
         const userdetailsExist = await db.employee.findOne({ where:{ email, password }})
         const userDetails = userdetailsExist.get()
         console.log(userdetailsExist.get());
         if (userDetails?.id) {
          const token =  await createJWTToken( userdetailsExist?.id, userdetailsExist?.email )
          return({ sucess: true,...token, statusCode:200, message: "user sucessfully login" });
         }else {
          return({ sucess: false, statusCode:401, message: "unauthorize" });
         }
      } catch (error) {
          return({ sucess:false, statusCode: 500, message:"internal server error", error:error.message});
  
      }
  }
module.exports= {loginemp}