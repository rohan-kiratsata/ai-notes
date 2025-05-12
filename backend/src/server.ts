import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routes/auth";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
