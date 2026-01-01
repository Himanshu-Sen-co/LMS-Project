import Course from '../models/coursesModel.js';
import { Review } from '../models/reviewModel.js';

export const createReview = async (req , res) => {
    try {
        const { courseId, rating, comment } = req.body;
        const userId = req.userId;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const alreadyReviewed = await Review.findOne({ user: userId, course: courseId });
        if (alreadyReviewed) {
            return res.status(201).json({ message: 'You have already reviewed this course' });
        }
        const review = new Review({
            user: userId,
            course: courseId,
            rating,
            comment
        });
        await review.save();
        await course.reviews.push(review._id);
        await course.save();
        return res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error creating review' + error });
    }
}

export const getCourseReviews = async (req , res) => {
    try {
        // const { courseId } = req.body;
        const reviews = await Review.find({}).populate('user course').sort({reviewedAt: -1});
        return res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews' + error });
    }
}