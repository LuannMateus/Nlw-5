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

  async create({ email }: IUserInterface) {
    try {
      const userAlreadyExists = await this.userRepository.findOne({ email });

      if (userAlreadyExists) return userAlreadyExists;

      const user = this.userRepository.create({ email });

      this.userRepository.save(user);

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export { UsersService };
