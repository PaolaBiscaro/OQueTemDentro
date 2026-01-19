import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// 👇 agora aponta para src/public
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

export default app;
