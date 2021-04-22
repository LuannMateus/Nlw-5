import express from "express";
import "reflect-metadata";
import "./database";

import { routes } from "./routes";

// * Express Instance
const app = express();

const PORT = 3000;

app.use(express.json()).use("/api", routes);

app
  .get("/", (_req, res) => {
    return res.status(200).json({
      message: "Work a lot",
    });
  })
  .post("/", (_req, res) => {
    return res.status(201).json({
      message: "Created with a success!",
    });
  });

app.listen(PORT, () => console.log(`Server is running in PORT - [${PORT}]`));
