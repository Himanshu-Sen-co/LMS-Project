import razorpay from 'razorpay';
import dotenv from 'dotenv';
import Course from '../models/coursesModel.js';
import User from '../models/userModel.js';

dotenv.config();

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const {courseId } = req.body;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const options = {
            amount: course.price * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: courseId.toString(),
        };
        const order = await razorpayInstance.orders.create(options);
        return res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ error: "Failed to create order" });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const {courseId, userId, razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            // Here you can add logic to enroll the user in the course
            const user = await User.findById(userId);
            if (!user.enrolledCourses.includes(courseId)) {
                user.enrolledCourses.push(courseId);
                await user.save();
            }
            const course = await Course.findById(courseId).populate('lectures');
            if (!course.enrolledStudents.includes(userId)) {
                course.enrolledStudents.push(userId);
                await course.save();
            }
            return res.status(200).json({ message: "Payment verified and course enrolled successfully" });
        } else {
            return res.status(400).json({ message: "Payment not verified" });
        }

    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ error: "Failed to verify payment" });
    }
};