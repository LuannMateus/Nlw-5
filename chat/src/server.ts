import express, { json } from "express";

// * Express Instance
const app = express();

const PORT = 3000;

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
