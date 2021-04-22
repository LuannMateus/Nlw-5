import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
  async create(req: Request, res: Response) {
    const { admin_id, text, user_id } = req.body;

    const messageService = new MessagesService();

    try {
      const message = await messageService.create({
        admin_id,
        text,
        user_id,
      });

      return res.status(201).json(message);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        errorMessage: error.message,
      });
    }
  }

  async showByUser(req: Request, res: Response) {
    const { id } = req.params;

    const messageService = new MessagesService();

    try {
      const messagesList = await messageService.listByUser(id);

      return res.status(200).json(messagesList);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error,
      });
    }
  }
}

export { MessagesController };
