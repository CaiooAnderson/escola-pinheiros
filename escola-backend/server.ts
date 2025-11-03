import "./prisma/seed";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Rodando [${process.env.NODE_ENV}]`);
});
