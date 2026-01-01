import express from 'express';
// import authenticateUser from '../middleware/userAuth';
import { createOrder, verifyPayment } from '../controllers/orderController.js';

const orderRouter = express.Router();


orderRouter.post("/createOrder", createOrder)
orderRouter.post("/verifyPayment", verifyPayment)


export default orderRouter;