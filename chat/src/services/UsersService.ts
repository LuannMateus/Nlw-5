import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUserInterface {
  email: string;
}

class UsersService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }

  async getAll() {
    try {
      const users = this.userRepository.find();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async create({ email }: IUserInterface) {
    try {
      const userAlreadyExists = await this.userRepository.findOne({ email });

      if (userAlreadyExists) return userAlreadyExists;

      const user = this.userRepository.create({ email });

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail({ email }: IUserInterface) {
    try {
      const user = await this.userRepository.findOne({ email });

      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

export { UsersService };
