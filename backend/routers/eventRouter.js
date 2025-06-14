import express from "express";
import {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";
import upload from '../middlewares/uploadMiddlewareEvent.js';

const router = express.Router();

router.get('/getall', getAllEvents);
router.post('/', upload.single('file'), createEvent);
router.put('/:id', upload.single('file'), updateEvent);
router.delete('/:id', deleteEvent);

export default router;