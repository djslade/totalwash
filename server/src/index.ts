import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import { apiRouter } from "./routes";
import cors from "cors";
import { json, urlencoded } from "body-parser";

dotenv.config();

const app = express();

const port = process.env.PORT;

mongoose.set("strictQuery", false);
mongoose.plugin(slug);
mongoose.connect(process.env.MONGO_URI || "");

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
