import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, user_id, text }: IMessageCreate) {
    try {
      const message = this.messagesRepository.create({
        admin_id,
        user_id,
        text,
      });

      await this.messagesRepository.save(message);

      return message;
    } catch (error) {
      throw error;
    }
  }

  async listByUser(user_id: string) {
    try {
      const messagesList = await this.messagesRepository.find({
        where: { user_id },
        relations: ["user"],
      });
      return messagesList;
    } catch (error) {
      throw error;
    }
  }
}

export { MessagesService };
