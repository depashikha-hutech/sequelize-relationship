const express = require('express');
const { addMedia, getMedia, Destroymedia} = require('../utility/media');
const route = express.Router();

route.post("/upload", async (req, res) => {
    try {
       const mediaData  = req.files;
        console.log({mediaData});
        if(Array .isArray(mediaData?.file))
       // var d = mediaData.data.toString('base64');
         // console.log(d);
       { const createMedia = await addMedia(mediaData?.file)
        if (createMedia){
            res.status(200).json({createMedia, message:"file uploaded successfuly", success:true})
        }else{
          res.status(500).json({
         success: false,
         statusCode: 500,
         message: "failed to upload",
    });

       }
    }else{
        const createMedia = await addMedia([mediaData?.file]) 
               if(createMedia){
                   res.status(200).json({createMedia, message:"file uploaded successfuly", success:true})
               }else{
                 res.status(500).json({
                success: false,
                statusCode: 500,
                message: "failed to upload",
           });
               }
             }
              
           } catch (error) {
               console.log(error);
                res.status(500).json({
                success: false,
                statusCode: 500,
                message: "failed to upload",
                error: error.message,
           });
           }
       })   
       
       // get by id
       route.get("/:id", async (req, res)=> {
        try {
            let mediainfo = await  getMedia(req?.params?.id);
            console.log(mediainfo);
            res.status(mediainfo?.statusCode).json(mediainfo);
        }catch (error) {
            res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
        }
    });
    //get all media

    route.get("/", async (req, res)=> {
        try {
            const mediadetails = await getMedia();
            res.status(mediadetails?.statusCode).json(mediadetails);
        }catch (error) {
            console.log(error);
            res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
        }
    });



    //delete media by id
    route.delete("/:id", async (req, res) => {
        try{
            const deletemedia = await Destroymedia(req?.params?.id);
            res.status(deletemedia?.statusCode).json(deletemedia);
         }catch (error) {
             console.log(error);
            res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
         }
    
    });
    // fetech media by id
    route.get("/download/:id", async (req, res) =>{
        try{
            //let  file = await getMedia(req?.params?.id);
            //file=file?.channel.get()
            const mediainfo = await getMedia(req?.params?.id);
            console.log(mediainfo);
  res.setHeader("Content-Length", mediainfo?.channel?.fileSize);
  res.write(mediainfo?.channel?.fileData, "binary");
  res.end();
        }catch (error) {
            console.log(error);
           res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
        }
   
    });
    
    
module.exports = route;
