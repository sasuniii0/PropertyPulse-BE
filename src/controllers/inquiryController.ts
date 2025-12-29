import { Request,Response } from "express";
import { Inquiry,InquiryStatus } from "../models/inquiry";
import { Listning } from "../models/listningModel";
import { AuthRequest } from "../middlewares/authMiddleware";
import { log } from "node:console";


// create inquiry
export const createInquiry = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId, message } = req.body;
    const clientId = req.user!.sub; 
    console.log(listingId,clientId)

    const listing = await Listning.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const inquiry = await Inquiry.create({
      client: clientId,
      agent: listing.agent,
      listing: listing._id,
      message,
    });

    res.status(201).json(inquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create inquiry" });
  }
};


// get my inquiries => CLIENT
export const getClientInquiries = async (req: AuthRequest, res: Response) => {
  try {
    const inquiries = await Inquiry.find({ client: req.user!.sub })
      .populate("listing")
      .populate("agent", "name email phone")
      .sort({ createdAt: -1 });

    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};


// get inquires for my listing => AGENT
export const getAgentInquiries = async (req: AuthRequest, res: Response) => {
  try {
    const inquiries = await Inquiry.find({ agent: req.user!.sub })
      .populate("listing")
      .populate("client", "name email phone")
      .sort({ createdAt: -1 });

    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};


// respond to inquiry => AGENT
export const respondToInquiry = async (req:Request, res:Response) => {
    try{
        const {response} = req.body;

        const inquiry = await Inquiry.findById(req.params.id);
        log(inquiry)
        if(!inquiry) {
            return res.status(404).json({message : "Inquiry not found"})
        }
        inquiry.agentResponse = response;
        inquiry.status = InquiryStatus.RESPONDED;
        await inquiry.save();
        res.json(inquiry)
    }catch(error){
        res.status(500).json({ message : "Failed to respond to inquiry"})
    }
}

// close inuiry => AGENT
export const closeInquiry = async (req:Request , res:Response) => {
    try{
        const inquiry = await Inquiry.findById(req.params.id);
        if(!inquiry) {
            return res.status(404).json({ message : "Inquiry not found"});
        }
        inquiry.status = InquiryStatus.CLOSED;
        await inquiry.save();
        res.json(inquiry);
    }catch(error){
        res.status(500).json({message : "Failed to close inquiry"})
    }
}