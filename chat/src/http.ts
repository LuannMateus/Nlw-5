import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "reflect-metadata";

import "./database";
import { routes } from "./routes";

// * Express Instance
const app = express();

// * Html View
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const http = createServer(app);
const io = new Server(http);

app.get("/pages/client", (_req, res) => {
  return res.render("html/client.html");
});

app.get("/pages/admin", (_req, res) => {
  return res.render("html/admin.html");
});

app.use(express.json()).use("/api", routes);

export { http, io };
