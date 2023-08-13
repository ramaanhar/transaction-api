import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import routes from "../routes";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// app.use("/", (req: Request, res: Response, next: NextFunction) => {
//   res.json({ message: "Hello World" });
// });
routes(app);

export default app;
