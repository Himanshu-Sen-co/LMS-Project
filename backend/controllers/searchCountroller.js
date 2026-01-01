import Course from "../models/coursesModel.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();




export const searchWithAi = async (req , res) => {
    try {
        const { query} = req.body;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const prompt = `You are an intelligent assistent for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return **most relevant keyword** from the following list of course categories and levels:
        
        - App Development
        - Web Development
        - Data Science
        - Machine Learning
        - Artificial Intelligence
        - Cloud Computing
        - Cybersecurity
        - DevOps
        - Programming Languages
        - Beginner
        - Intermediate
        - Advanced
        - AI/ML
        - Data Analytics
        - Ethical Hacking
        - UI/UX Designing
        - AI Tools
        - Others
        
        Only reply with the most relevant keyword from the above list that matches the user's query. Do not provide any explanations or additional text. If none of the keywords are relevant, reply with 'Others'.
        user Query: ${query}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        const keyword = response.text.trim();
        console.log("Generated Keyword:", keyword);
        const courses = await Course.find({
            isPublished: true,
            $or: [
                {title: { $regex: query, $options: "i"}},
                {description: { $regex: query, $options: "i"}},
                {category: { $regex: query, $options: "i"}},
                {subTitle: { $regex: query, $options: "i"}},
                {level: { $regex: query, $options: "i"}}
            ]
        })
        if (courses.length > 0) {
            
            return res.status(200).json(courses);
        }else {
           const courses = await Course.find({
            isPublished: true,
            $or: [
                {title: { $regex: keyword, $options: "i"}},
                {description: { $regex: keyword, $options: "i"}},
                {category: { $regex: keyword, $options: "i"}},
                {subTitle: { $regex: keyword, $options: "i"}},
                {level: { $regex: keyword, $options: "i"}}
            ]
        }) 
            return res.status(200).json(courses);
        }
    } catch (error) {
        console.error("Error in searchWithAi:", error);
        return res.status(500).json({ message: "Failed to search courses: " + error });
    }
}