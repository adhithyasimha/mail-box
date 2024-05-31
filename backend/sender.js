// re_aJfU9vHL_DGMnihQa24A1Hp4eRV9Nj7KA -resend email key
const env=require('dotenv')
const envi=require()
const nodemailer = require('nodemailer');

// creating a delivery guy like object using the SMTP 
const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true, // use SSL for "security" but security is a myth
  auth: {
    user: 'resend',
    pass: 're_aJfU9vHL_DGMnihQa24A1Hp4eRV9Nj7KA', 
  },
});

// the struct of the mail
const message = {
  from: 'adhihtya@spaceforce1.in', 
  to: 'himmler@nazi.com',
  subject: 'kill jews',
  text: 'heil hitler',
};

// sending the above struct  to the delivery guy to send it to its dest which is childs play :)
transporter.sendMail(message, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});
