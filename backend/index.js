import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authroute.js"
import userRouter from "./routes/userRoute.js"
import cors from "cors"
import courseRouter from "./routes/courseRoute.js"
import orderRouter from "./routes/orderRoute.js"
import reviewRouter from "./routes/reviewRoute.js"
dotenv.config()
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173", credentials: true }))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter) 
app.use("/api/course", courseRouter)
app.use("/api/order", orderRouter)
app.use("/api/review", reviewRouter)

app.get("/", (req, res) => {    
    res.send("server startend ")
})

app.listen(port, ()=>{
    console.log("server started ");
    connectDb()
})
