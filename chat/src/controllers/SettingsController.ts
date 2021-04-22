import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
  async getAll(req: Request, res: Response) {
    const serviceSettings = new SettingsService();

    try {
      const settings = await serviceSettings.getAll();

      return res.status(200).json(settings);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params;

    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.findByUsername(username);

      res.json(settings);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error.message,
      });
    }
  }

  async create(req: Request, res: Response) {
    const { chat, username } = req.body;
    const serviceSettings = new SettingsService();

    try {
      await serviceSettings.create({ chat, username });

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        errorMessage: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    const { username } = req.params;
    const { chat } = req.body;

    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.update(username, chat);

      return res.json(settings);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error.message,
      });
    }
  }
}

export { SettingsController };
