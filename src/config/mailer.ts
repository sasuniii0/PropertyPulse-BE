import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sasuniwijerathne@gmail.com',
    pass: 'jqtj byot tuiq lzmo',
  },
});

console.log(process.env.EMAIL_USER)
console.log(process.env.EMAIL_PASS)

// Verify transporter (optional but useful)
transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying transporter:', error);
  } else {
    console.log('Email transporter is ready!');
  }
});

// Function to send email
export const sendMail = async ({ to, subject, html }: MailOptions) => {
  const mailOptions = {
    from: 'sasuniwijerathne@gmail.com', // sender address
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};
