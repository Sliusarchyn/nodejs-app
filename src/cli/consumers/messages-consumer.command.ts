import amqp from "amqplib";
import { injectable } from "inversify";
import { AppConfig } from "../../config/app.config";
import { Logger } from "../../infrastructure/logger";
import MessageService from "../../services/message.service";

@injectable()
class MessagesConsumerCommand {
  static COMMAND = 'messages:consumer';

  constructor(
    private readonly appConfig: AppConfig,
    private readonly logger: Logger,
    private readonly messageService: MessageService
  ) {
    this.appConfig = appConfig;
  }

  public async execute(): Promise<number> {
    this.logger.info('Consumer starting...');

    const rabbitConnection = await amqp.connect({
      hostname: this.appConfig.rabbitConfig.hostname,
      username: this.appConfig.rabbitConfig.username,
      password: this.appConfig.rabbitConfig.password,
      port: this.appConfig.rabbitConfig.port.getValue(),
    });

    const queue: string = 'messages';

    const channel = await rabbitConnection.createChannel();
    this.logger.debug('Channel created');

    await channel.assertQueue(queue, { durable: true });
    this.logger.debug(`Queue [${queue}] asserted`);
    await channel.prefetch(1);

    try {
      await channel.consume(queue, async (msg) => {
        this.logger.debug(`Message received`);

        await new Promise(resolve => setTimeout(resolve, 2 * 1000));

        if (msg !== null) {
          try {
            await this.messageService.handleMessage(msg);
          } catch (e: any) {
            this.logger.error(e.message);
          }

          channel.ack(msg);
          this.logger.debug('Message ack!');
        } else {
          console.log('Consumer cancelled by server');
        }
      });
    } catch (e: any) {
      console.log(e.message);
    }

    this.logger.info('Consumer started')

    return 0;
  }
}

export { MessagesConsumerCommand };
