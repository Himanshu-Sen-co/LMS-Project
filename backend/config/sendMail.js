import nodemailer from "nodemailer";                     
import dotenv from "dotenv";

dotenv.config();                                                                                   
// Create a test account or replace with real credentials.

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {                                                                                                                                                                                                                                                                                                                                           
    user: process.env.USER_GMAIL, // generated ethereal user
    pass: process.env.USER_PASSWORD, // generated ethereal password
  },
});

// cuuz kcir lise sbf

// Wrap in an async IIFE so we can use await.
const sendMail = async (to, otp) => {
     await transporter.sendMail({
    from: process.env.USER_GMAIL, 
    to: to, 
    subject: "Reset Your Password", 
    html: `<p> your otp for reset password is <b>${otp} </b>. 
    It expires in 5 minutes. </p>`, 
  });                                                                                                                                                                                                                                                                                               
                                                                                                                       
}

export default sendMail;