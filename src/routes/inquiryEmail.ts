// src/routes/inquiryEmailRoute.ts
import { Router, Request, Response } from 'express';
import { sendMail } from '../config/mailer';
import {User} from '../models/userModel'; 

interface InquiryEmailBody {
  agentId: string;
  propertyTitle: string;
  clientName: string;
  clientEmail: string;
  message: string;
}

const router = Router();

router.post('/send-inquiry', async (req: Request<{}, {}, InquiryEmailBody>, res: Response) => {
  const { agentId, propertyTitle, clientName, clientEmail, message } = req.body;

  try {
    // Fetch agent info from DB
    const agent = await User.findById(agentId);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    // Send email
    await sendMail({
      to: agent.email,
      subject: `New Inquiry for ${propertyTitle}`,
      html: `
        <p>Hi ${agent.name},</p>
        <p>You have received a new inquiry from ${clientName} (${clientEmail}) for your property <strong>${propertyTitle}</strong>.</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Regards, <br/> PropertyPulse Team</p>
      `,
    });

    res.status(200).json({ message: 'Inquiry email sent successfully' });
  } catch (error) {
    console.error('Failed to send inquiry email:', error);
    res.status(500).json({ message: 'Failed to send inquiry email' });
  }
});

export default router;
