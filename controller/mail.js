const express = require('express');
const { sendemail } = require('../utility/mail');
const route = express.Router();



route.post("/send-mail",(req, res)=> {
  const {to, subject,text} =req?.body;  
    const emailInfo =   sendemail( to,subject,text);
    console.log(emailInfo);
    res.status(200).json(emailInfo)
    });  
module.exports = route;