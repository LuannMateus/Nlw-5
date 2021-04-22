import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {
  async create(req: Request, res: Response) {
    const { email } = req.body;

    const usersService = new UsersService();

    try {
      const user = await usersService.create({ email });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error.message,
      });
    }
  }
}

export { UsersController };
