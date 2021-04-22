import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionRepository: Repository<Connection>;

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    try {
      const connection = this.connectionRepository.create({
        socket_id,
        user_id,
        admin_id,
        id,
      });

      await this.connectionRepository.save(connection);

      return connection;
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(user_id: string) {
    try {
      const connection = await this.connectionRepository.findOne({ user_id });

      return connection;
    } catch (error) {
      throw error;
    }
  }
}

export { ConnectionsService };
