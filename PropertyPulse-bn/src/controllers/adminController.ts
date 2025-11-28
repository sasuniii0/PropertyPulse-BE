import { Request, Response } from "express";
import { ListingStatus, Listning } from "../models/listningModel";

export const approveListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listning.findByIdAndUpdate(
      req.params.id,
      { status: ListingStatus.APPROVED },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json({ message: "Listing Approved", data: listing });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listning.findByIdAndUpdate(
      req.params.id,
      { status: ListingStatus.REJECTED },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json({ message: "Listing Rejected", data: listing });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
