const { Op } = require("sequelize");
const db = require("../models/db");
const metting = require("../models/metting");
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

async function getmeeting(q, dateStr,id) {
    console.log(q, dateStr,id);
  try {
    let andConditions = [];
    if (!q && !dateStr) { andConditions = {};
} else {
      const today = new Date()?.toISOString()?.split("T")[0];
      console.log(today);
      const tomorrow = new Date(new Date()?.setDate(new Date().getDate() + 1))
        ?.toISOString()
        ?.split("T")[0];
      if (q) {
        andConditions.push({ title: { [Op.iLike]: `%${q}%` } });
      }
      if (dateStr === "today") {
        andConditions.push({ date: { [Op.eq]: today } });
      } else if (dateStr === "tomorrow") {
        andConditions.push({ date: { [Op.eq]: tomorrow } });
     // } else if (dateStr === "week") {
        //
     // } else if (dateStr === "month") {
        
      } else if (dateStr) {
        const [startDate, endDate] = dateStr?.split(":");
        andConditions.push({
          date: { [Op.and]: [{ [Op.gte]: startDate }, { [Op.lte]: endDate }] },
        });
      }
    }
    const meet = await db.Metting.findAndCountAll({
      where:  id ? {id} : andConditions,
    });
    return {
        sucess:true,
        statusCode: 200,
        message:"meeting created sucessfully",
        totalCount:meet?.count,
         meeting: meet?.rows,
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
