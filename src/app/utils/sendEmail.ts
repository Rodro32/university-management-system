import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to:string,html:string) =>{
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === 'production', 
    auth: {
      user: "jrrodro32@gmail.com",
      pass: "qvam nprq tfjd vzvd",
    },
  });

  await transporter.sendMail({
    from: 'jrrodro32@gmail.com',
    to,
    subject: "change password",
    text: "Hello Nazmul password change kor",
    html, 
  });
}