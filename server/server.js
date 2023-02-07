import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import settingRoute from "./Routes/settings.js";

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth/", authRoute);
app.use("/api/settings", settingRoute);

// Connection
const Connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db!");
  } catch (err) {
    throw err;
  }
};

app.listen(8800, () => {
  Connect();
  console.log("Connected");
});
