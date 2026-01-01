import express from "express"
import { deleteUser, getAllUsers, googleAuth, login, logout, resetPassword, sentOtp, signup, verifyOtp } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/deleteuser", deleteUser);
authRouter.get("/getallusers", getAllUsers);
authRouter.post("/sentotp", sentOtp);
authRouter.post("/verifyotp", verifyOtp);   
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/googleSignup", googleAuth); 

export default authRouter;