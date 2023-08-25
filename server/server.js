import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import marketingRoutes from "./routes/marketing.routes.js"
import { errorHandler } from "./middlewares/error.middlware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// mongoose connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to mongo cluster")).catch(err => console.log(err))

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());

// test route 
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "server up and running!"
    });
});

app.use("/api/auth/v1", authRoutes);
app.use("/api/user/v1", userRoutes);
app.use("/api/marketing/v1", marketingRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));
