import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
// import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

// import authRouter from "./routes/authRouter";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// app.use(authRouter);

// app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server On!"));
