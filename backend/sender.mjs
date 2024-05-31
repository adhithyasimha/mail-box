import { Resend } from 'resend';

const resend = new Resend('re_aJfU9vHL_DGMnihQa24A1Hp4eRV9Nj7KA');

resend.emails.send({
  from: 'adhithya@spaceforce1.in',
  to: 'psadhithya03@gmail.com',
  subject: 'Hello World',
  html: '<p>hail hitler</p>'
});




//re_aJfU9vHL_DGMnihQa24A1Hp4eRV9Nj7KA -resend email key
