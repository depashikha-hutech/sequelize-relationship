const express = require('express');
const { getaddress, addressdestory} = require('../utility/address');
const route = express.Router();

const { authorizeUser } = require("../utility/auth");

//get meeting by id
route.get("/:id",authorizeUser, async (req, res)=> {
    try {
        const addressdetails = await  getaddress(req?.params?.id);
        res.status(addressdetails?.statusCode).json(addressdetails);
    }catch (error) {
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});

// get all
route.get("/", async (req, res)=> {
    try {
      const { offset, limit, w } = req.query;
        const addressinfo = await  getaddress( offset, limit, w);
        res.status(addressinfo?.statusCode).json(addressinfo);
    }catch (error) {
      console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
  });
  //delete by id
  route.delete("/:id",  async (req, res) => {
    try{
        const deleteaddress = await addressdestory(req?.params?.id);
        console.log(deleteaddress);
        res.status(deleteaddress?.statusCode).json(deleteaddress);
     }catch (error) {
         console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
     }
  
  });
  
module.exports = route;
