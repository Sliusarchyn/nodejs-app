import { Container } from "inversify";
import { MessagesConsumerCommand } from "../cli/consumers/messages-consumer.command";
import { AppConfig } from "./app.config";
import { RabbitmqConfig } from "./rabbitmq.config";
import { WebServerCommand } from "../cli/web-server.command";
import { Logger } from "../infrastructure/logger";
import MessageService from "../services/message.service";

const container = new Container();

container.bind<Logger>(Logger).to(Logger);
container.bind<AppConfig>(AppConfig).to(AppConfig);
container.bind<RabbitmqConfig>(RabbitmqConfig).to(RabbitmqConfig);

container.bind<MessagesConsumerCommand>(MessagesConsumerCommand).to(MessagesConsumerCommand);
container.bind<WebServerCommand>(WebServerCommand).to(WebServerCommand);

container.bind<MessageService>(MessageService).to(MessageService);

export { container };
