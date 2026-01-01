import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ message: "Token verification failed, authorization denied" });
        }
        console.log("====================================================",verifyToken.id);
        
        req.userId = verifyToken.id; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default authenticateUser;