import express from 'express';
import { getCurrentUser, updateProfile } from '../controllers/userController.js';
import authenticateUser from '../middleware/userAuth.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

// Define user-related routes here
userRouter.get('/getCurrentUser', authenticateUser,  getCurrentUser)
userRouter.post('/updateProfile', authenticateUser, upload.single("photoUrl"),  updateProfile);
export default userRouter;