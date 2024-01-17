import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL.toString(),
  credentials: true,

}))
app.use(express.urlencoded({ extended: true,
limit: '16kb', }));
app.use(express.static("public"));
app.use(cookieParser())
app.use(express.json({ limit: "16kb" }));


    
    




 import userRouter from "./routes/user.router.js";

 app.use("/api/v1/users", userRouter);

export default app;
