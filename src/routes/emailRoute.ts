import { Router, Request, Response } from 'express';
import { sendMail } from '../config/mailer';

const router = Router();

interface LoginEmailBody {
  email: string;
  name: string;
  loginTime: string;
}

router.post('/send-login-email', async (req: Request<{}, {}, LoginEmailBody>, res: Response) => {
  const { email, name, loginTime } = req.body;

  try {
    await sendMail({
      to: email,
      subject: 'Login Alert - PropertyPulse',
      html: `
        <p>Hi ${name},</p>
        <p>You have successfully logged in to PropertyPulse.</p>
        <p><strong>Login Time:</strong> ${loginTime}</p>
        <p>If this wasn't you, please change your password immediately.</p>
        <p>Regards, <br/> PropertyPulse Team</p>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

export default router;
