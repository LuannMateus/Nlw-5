import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const settingsController = new SettingsController();

const usersController = new UsersController();

const messagesController = new MessagesController();

routes
  .get("/settings", settingsController.getAll)
  .post("/settings", settingsController.create);

routes.get("").post("/users", usersController.create);

routes
  .get("/messages/:id", messagesController.showByUser)
  .post("/messages", messagesController.create);

export { routes };
