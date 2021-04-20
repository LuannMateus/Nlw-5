import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController {
  async create(req: Request, res: Response) {
    try {
      const { chat, username } = req.body;
      const settingsRepository = getCustomRepository(SettingsRepository);

      const settings = settingsRepository.create({
        chat,
        username,
      });

      await settingsRepository.save(settings);

      return res.status(201).json(settings);
    } catch (error) {
      return res.status(400);
    }
  }
}

export { SettingsController };
