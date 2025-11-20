import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";


dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Food Bank API is running ");
});

// routes
import userRoutes from "./routes/userRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

app.use("/api/user", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));