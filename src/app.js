import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";   

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,        // in production we have to  -
    credentials: true                       //define by which ip we reqesting the reqsts
}));      // app.use used for setup configrations -
          // and other setting through middelware

app.use(express.json({limit: "16kb"}))      // this is used to limit the json size res, req
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"))
app.use(cookieParser())      // it is used to access the user browser cokeis and operate curd operation and other operations

// import routes
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);

export { app }