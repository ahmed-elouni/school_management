import express from 'express';
import { updateAdminProfile, getAdminProfile,createAdminProfile } from '../controllers/settingsProfileController.js';

const router = express.Router();
// Base path: /api/v1/admin
router.get('/profile', getAdminProfile);
router.put('/updateProfile', updateAdminProfile);
router.post('/createProfile', createAdminProfile);

export default router;
