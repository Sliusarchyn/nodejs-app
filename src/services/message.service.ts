import { injectable } from "inversify";
import { Logger } from "../infrastructure/logger";
import amqp from "amqplib";

@injectable()
class MessageService {
  constructor(
    private readonly logger: Logger,
  ) {}

  public async handleMessage(msg: amqp.ConsumeMessage): Promise<void> {
    this.logger.debug('Message handling...');
    this.logger.debug(`Message body:${msg.content.toString()}`);
  }
}

export default MessageService;
