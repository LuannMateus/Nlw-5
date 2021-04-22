import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsInterface {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async getAll() {
    try {
      const settings = await this.settingsRepository.find();

      return settings;
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string) {
    try {
      const settings = await this.settingsRepository.findOne({
        username,
      });

      return settings;
    } catch (error) {
      throw error;
    }
  }

  async create({ chat, username }: ISettingsInterface) {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) throw new Error("User already exists!");

    const settings = this.settingsRepository.create({
      chat,
      username,
    });

    await this.settingsRepository.save(settings);

    return settings;
  }

  async update(username: string, chat: boolean) {
    const settings = this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ username, chat })
      .where("username = :username", {
        username,
      })
      .execute();

    return settings;
  }
}

export { SettingsService };
