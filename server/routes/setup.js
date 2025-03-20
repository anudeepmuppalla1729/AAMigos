import express from 'express';
import { verifyAgent, verifyToken, verifyUser } from '../middlewares/authMiddleware.js';
import { setupAgent, setupUser } from '../controllers/setupControllers.js';
const router = express.Router();
import multer from 'multer';
import {storage} from '../cloudConfig.js';
const upload = multer({storage});

router.post('/user/setupProfile',verifyToken, verifyUser, upload.single("profilePic") , setupUser);

router.post('/agent/setupProfile',verifyToken, verifyAgent,upload.single("profilePic") , setupAgent);


export default router;