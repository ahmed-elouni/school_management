// routes/trimestreRoutes.js
import express from 'express';
import { createTrimestre } from '../controllers/trimestreController.js';
import{getTrimestres} from '../controllers/trimestreController.js';
const router = express.Router();
router.post('/', createTrimestre);
router.get('/', getTrimestres);
export default router;