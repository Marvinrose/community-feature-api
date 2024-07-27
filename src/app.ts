import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { postRoutes, commentRoutes, userRoutes } from "./routes";
import mockUserMiddleware from "./middlewares/mockUserMiddleware";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware";

const app = express();

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(mockUserMiddleware);

app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);

app.use(errorHandlingMiddleware);

export default app;
