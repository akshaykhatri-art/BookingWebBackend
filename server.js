import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// auth route
import authRoutes from "./routes/authRoutes.js";

// booking route
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
