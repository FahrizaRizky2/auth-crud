import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); //allow us to acc JSON data in req.body
app.use(cookieParser()); // allow parse incoming cookie

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist" , "index.html"));
    });
}

app.listen(PORT, ()=>{
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});

