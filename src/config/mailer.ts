import sgMail from '@sendgrid/mail';
import { log } from 'console';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
log('SendGrid API Key:', process.env.SENDGRID_API_KEY);

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ to, subject, html }: MailOptions) => {
  return sgMail.send({
    to,
    from: process.env.SENDGRID_SENDER!, // must be verified in SendGrid
    subject,
    html,
  });
};
