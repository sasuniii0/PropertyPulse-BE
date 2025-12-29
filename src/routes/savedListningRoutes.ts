import {
  saveProperty,
  unsaveProperty,
  getSavedProperties,
  checkIfSaved,
  toggleSaveProperty
} from '../controllers/savedListningController'

import express from "express";
import { authenticate } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleRequiredMiddleware';
import { Role } from '../models/userModel';


const router = express.Router();

router.get('/',authenticate,requireRole([Role.CLIENT]) , getSavedProperties);

router.post('/save',authenticate,requireRole([Role.CLIENT]), saveProperty);

router.post('/toggle',authenticate,requireRole([Role.CLIENT]), toggleSaveProperty);

router.get('/check/:listingId',authenticate,requireRole([Role.CLIENT]), checkIfSaved);

router.delete('/:listingId',authenticate,requireRole([Role.CLIENT]), unsaveProperty);

export default router