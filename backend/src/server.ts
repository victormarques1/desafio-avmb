import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
