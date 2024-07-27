import express from "express";
import cors from "cors";
import helmet from "helmet";
import { postRoutes, commentRoutes, userRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);

export default app;
