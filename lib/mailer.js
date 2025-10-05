import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('Error with mail transporter:', error);
  } else {
    console.log('Mail transporter ready:', success);
  }
});

export default transporter;