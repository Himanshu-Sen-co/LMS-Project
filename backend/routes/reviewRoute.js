import express from 'express';
import authenticateUser from '../middleware/userAuth.js'
import { createReview, getCourseReviews } from '../controllers/reviewController.js';


const reviewRouter = express.Router();


reviewRouter.post("/createReview", authenticateUser, createReview);
reviewRouter.get("/getReviews",authenticateUser, getCourseReviews)

export default reviewRouter;