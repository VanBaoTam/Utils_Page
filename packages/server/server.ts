import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { routes } from "./src/routes";
import cors from "cors";
// -----------------------------------------------
dotenv.config();
const app: Express = express();
const port = process.env.SERVER_PORT;

// -----------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------------------------
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
routes(app);

// -----------------------------------------------
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
