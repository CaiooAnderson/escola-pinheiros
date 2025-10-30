import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/modules/auth/authRoutes";

import promotionRoutes from "./src/modules/promotions/promotionRoutes";
import eventRoutes from "./src/modules/events/eventRoutes";
import faqRoutes from "./src/modules/faq/faqRoutes";
import feedbackRoutes from "./src/modules/feedback/feedbackRoutes";

import { errorHandler } from "./src/middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use(authRoutes);

app.use("/promotions", promotionRoutes);
app.use("/events", eventRoutes);
app.use("/faqs", faqRoutes);
app.use("/feedbacks", feedbackRoutes);

app.use(errorHandler);

export default app;
