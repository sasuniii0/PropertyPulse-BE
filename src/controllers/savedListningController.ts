import { Request,Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Listning } from "../models/listningModel";
import { Document } from "mongoose";
import savedListingModal from "../models/savedListingModal";

export const saveProperty = async (req:AuthRequest, res:Response) => {
  try {
    const { listingId } = req.body;
    const userId = req.user.sub;

    // Validate listing exists
    const listing = await Listning.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if already saved
    const existingSaved = await savedListingModal.findOne({
      user: userId,
      listing: listingId
    });

    if (existingSaved) {
      return res.status(400).json({
        success: false,
        message: 'Property already saved'
      });
    }

    // Create saved property
    const savedProperty = await savedListingModal.create({
      user: userId,
      listing: listingId
    });

    res.status(201).json({
      success: true,
      message: 'Property saved successfully',
      data: savedProperty
    });
  } catch (error) {
    console.error('Save property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save property',
    });
  }
};

export const unsaveProperty = async (req:AuthRequest, res:Response) => {
  try {
    const { listingId } = req.params;
    const userId = req.user.sub;

    const savedProperty = await savedListingModal.findOneAndDelete({
      user: userId,
      listing: listingId
    });

    if (!savedProperty) {
      return res.status(404).json({
        success: false,
        message: 'Saved property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property removed from saved list'
    });
  } catch (error) {
    console.error('Unsave property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsave property',
    });
  }
};

export const getSavedProperties = async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user.sub;

    const savedProperties = await savedListingModal.find({ user: userId })
      .populate({
        path: 'listing',
        select: 'title description price propertyType size bedrooms bathrooms images location status createdAt',
        populate: {
          path: 'agent',
          select: 'name email contactNumber'
        }
      })
      .sort({ createdAt: -1 });

    // Filter out saved properties where listing has been deleted
    const validSavedProperties = savedProperties.filter(
      (sp: Document & { listing?: any }) => sp.listing !== null
    );


    res.status(200).json({
      success: true,
      count: validSavedProperties.length,
      data: validSavedProperties
    });
  } catch (error) {
    console.error('Get saved properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get saved properties',
    });
  }
};

export const checkIfSaved = async (req:AuthRequest, res:Response) => {
  try {
    const { listingId } = req.params;
    const userId = req.user.sub;

    const savedProperty = await savedListingModal.findOne({
      user: userId,
      listing: listingId
    });

    res.status(200).json({
      success: true,
      isSaved: !!savedProperty
    });
  } catch (error) {
    console.error('Check saved property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check saved property',
    });
  }
};

export const toggleSaveProperty = async (req:AuthRequest, res:Response) => {
  try {
    const { listingId } = req.body;
    const userId = req.user.sub;

    // Validate listing exists
    const listing = await Listning.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if already saved
    const existingSaved = await savedListingModal.findOne({
      user: userId,
      listing: listingId
    });

    if (existingSaved) {
      // Unsave
      await savedListingModal.findByIdAndDelete(existingSaved._id);
      return res.status(200).json({
        success: true,
        message: 'Property removed from saved list',
        isSaved: false
      });
    } else {
      // Save
      await savedListingModal.create({
        user: userId,
        listing: listingId
      });
      return res.status(201).json({
        success: true,
        message: 'Property saved successfully',
        isSaved: true
      });
    }
  } catch (error) {
    console.error('Toggle save property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle saved property',
    });
  }
};