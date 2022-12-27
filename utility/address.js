const { Op } = require("sequelize");
const db = require("../models/db");
require("dotenv").config();
const env = process?.env

// get address
async function getaddress(offset, limit, w, id = null) {
    try {
      const getaddressdetails = await db.Address.findAndCountAll({ where : id ? {id} :{[Op.or]:[{state :{
      [Op.iLike]:`%${w}%`,
       }}, {pin: {
       [Op.iLike]: `%${w}`
    }}] },  offset, limit, });
      if(getaddressdetails.count > 0 ){
        return {
           sucess: true,
           statusCode: 200,
           message: "address details",
           totalCount: getaddressdetails?.count,
           address: getaddressdetails?.rows,
        }
      } else {
        return {
            sucess: true,
            statusCode: 500,
        message: " address details not found",
    
        }
    }
    
    } catch (error) {
       console.log(error);
          return({ sucess:false, statusCode: 500, message:"address not found", error: error.message });
    }
}   
//


async function addressdestory(id){
    try{
        const deladdress =await db.Address.destroy({ where: { id}});
        if(deladdress){
            return {
                sucess: true,
                statusCode:200,
                message:"deleted sucessfully",
            };
        } else{
            return{
            sucess: false,
            statusCode:500,
            message:"failed to delete the adress",
        }
     };
    } catch (error) {
        return({ sucess:false, statusCode: 400, message:"adress not found", error:error.message});
    }
    }

    module.exports = {getaddress, addressdestory}




