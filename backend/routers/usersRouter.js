import express from "express";
import { adminSignIn } from "../controllers/usersControllers.js";

const router = express.Router();

router.post('/admin/signin', adminSignIn);

export default router;