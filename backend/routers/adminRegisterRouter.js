import express from "express";
import  { adminSignIn }  from "../controllers/usersControllers.js";
import { adminRegister } from "../controllers/adminRegisterController.js";
import { GetAdminEmail } from "../controllers/adminRegisterController.js";

const router = express.Router();


router.post('/signin', adminSignIn);
router.post('/admin', adminRegister);
router.get('/adminMail', GetAdminEmail);

export default router;
