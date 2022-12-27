const express = require('express');
const {Createmeet,updatemeeting,getmeeting,deletemeeting} = require('../utility/metting');
const route = express.Router();

const { authorizeUser } = require("../utility/auth");

route.post("/", authorizeUser, async(req, res) => {
    try {
        const createmeet = await Createmeet({...req?.body,hostId:req?.user?.empId, orgId:req?.user?.orgId});
        res.status(createmeet?.statusCode).json(createmeet);
    } catch (error) {
    console.log(error);
    res.status(500).json({sucess: false, message:"internal server error", error: error.message});
}
});
// update metting
route.put("/:id", authorizeUser, async (req, res) => {
    try{
       const meetinfo= await updatemeeting(req?.params?.id, {...req?.body, orgId:req?.user?.orgId,hostId:req?.user?.empId });
       res.status(meetinfo?.statusCode).json(meetinfo);
    }catch (error) {
        console.log(error);
       res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//get meeting by id
route.get("/:id",authorizeUser, async (req, res)=> {
    try {
        const meetingdetails = await  getmeeting(req?.params?.id);
        res.status(meetingdetails?.statusCode).json(meetingdetails);
    }catch (error) {
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
// get all meeting
route.get("/",authorizeUser, async (req, res)=> {
    try {
        const meetingdetails = await getmeeting();
        res.status(meetingdetails?.statusCode).json(meetingdetails);
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//delete by id
route.delete("/:id", authorizeUser, async (req, res) => {
    try{
        const deletemeet = await deletemeeting(req?.params?.id);
        res.status(deletemeet?.statusCode).json(deletemeet);
     }catch (error) {
         console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
     }
    });

module.exports = route;
