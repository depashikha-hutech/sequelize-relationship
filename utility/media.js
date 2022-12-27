const db = require("../models/db");
require("dotenv").config();

const env = process?.env



async function addMedia(mediaData=[]){
    try {
      //1) using map create bulk object for model [{},{}]
      let  bulkMediaObj = mediaData?.map(media=>({
          mediaType: media.mimetype,
          fileName: media.name,
          fileSize:media?.size,
          fileType: media.mimetype,
          fileExtension: media.name,
          fileData: media.data,
          fileString: media.data.toString('base64'),
      }))

     if(bulkMediaObj?.length>0){
      //2) bulk create'
      const mediaAdded=await db.Media.bulkCreate(bulkMediaObj)
      console.log(mediaAdded);
      return mediaAdded
     }else{
      return null
     }


      //return response

  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
      error: error.message,
    };
  }
}


async function getMedia(id = null) {
    try{
        const mediadetails = await db.Media.findAll({where: id ? { id } : {},  });
        if (mediadetails.length > 0){
     return {
        sucess:true,
        statusCode: 200,
        message:"media found sucessfully",
        channel:id ? mediadetails[0] : mediadetails,
        };
    }else{
        return {
            sucess: true,
            statusCode:500,
            message:"media not created",
        }
    };
   } catch (error) {
    console.log(error);
       return({ sucess:false, statusCode: 400, message:"media not found", error: error.message });
    }
    }
   
//delet emp
async function Destroymedia(id){
    try{
        const delmedia =await db.Media.destroy({ where: { id}});
        if(delmedia){
            return {
                sucess: true,
                statusCode:200,
                message:"deleted sucessfully",
            };
        } else{
            return{
            sucess: false,
            statusCode:500,
            message:"failed to delete the  media",
        }
     };
    } catch (error) {
        return({ sucess:false, statusCode: 400, message:"media not found", error:error.message});
    }
    }

module.exports = {addMedia, getMedia, Destroymedia}













