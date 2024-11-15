import express from "express";
import "dotenv/config";
import cors from "cors";
import contactRouter from "../src/routes/contactRoute.js";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/contacts", contactRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Connex API",
  });
});
