const express = require('express');
const { loginemp} = require('../utility/login');
const route = express.Router();

route.get("/", (req, res)=> {
    res.send("welcome to express server ");
});
route.post("/login", async (req, res) =>{
    try{
        const userExist = await loginemp(req?.body?.email,  req?.body?.password); 
       // console.log({userExist });
        res.status(userExist?.statusCode).json(userExist);
    } catch (error){
        res.status(500).json({ sucess: false, message: "internal server error", error:error.message });
    }
});
module.exports = route;