import express from 'express';
import {
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
} from '../controllers/announcementController.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

// POST / (protégé)
router.post('/',  upload.single('file'), createAnnouncement);

// GET / (public)
router.get('/getall', getAllAnnouncements);

// PUT/DELETE /:id (protégé)
router.route('/:id')
  .put(upload.single('file'), updateAnnouncement)
  .delete(deleteAnnouncement);
  
export default router;