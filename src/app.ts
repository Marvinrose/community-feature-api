import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { postRoutes, commentRoutes, userRoutes } from "./routes";

const app = express();

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);

export default app;
