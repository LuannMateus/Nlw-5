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
  .get("/settings/:username", settingsController.findByUsername)
  .post("/settings", settingsController.create)
  .put("/settings/:username", settingsController.update);

routes
  .get("/users", usersController.getAll)
  .post("/users", usersController.create);

routes
  .get("/messages/:id", messagesController.showByUser)
  .post("/messages", messagesController.create);

export { routes };
