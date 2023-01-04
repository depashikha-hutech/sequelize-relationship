 const db = require("../models/db");
 require("dotenv").config();

 const env = process?.env

 console.log( {
   user: env.EMAIL,
   pass: env.EMAIL_PASSWORD
 });

  const nodemailer = require('nodemailer');
 
 async function sendemail(to, subject, text) {
 // let transport = nodemailer.createTransport(options[, defaults]);
  const mailTransporter =  nodemailer.createTransport({
      //service: 'gmail',
      host: 'smtp.gmail.com',
          port: 465,
        secure: true,
      auth: {
          user: env.EMAIL,
          pass: env.EMAIL_PASSWORD
     },
  });
// }
 // console.log(mailTransporter);
  const mailDetails = {
   from: 'depashikhadeepa169@gmail.com',
   to: to,
   subject: subject,
   text: text,
 };
 //console.log(mailDetails);

 mailTransporter.sendMail(mailDetails,(err, info) =>{
   if(err) {
      return console.log(err);
   } 
       res.status(200).send({message:"mailsend",message_id:info.message_id});
   });
  }
 module.exports={sendemail}
