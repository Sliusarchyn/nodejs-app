"use strict";

import "reflect-metadata";
import { program } from 'commander';
import { container } from "./config/container.config";
import { MessagesConsumerCommand } from "./cli/consumers/messages-consumer.command";
import { WebServerCommand } from "./cli/web-server.command";

program.name('CLI AppConfig')
  .description('CLI')
  .version('1.0.0');

program.command(MessagesConsumerCommand.COMMAND).action(async (options) => {
  await container.get(MessagesConsumerCommand).execute();
});

program.command(WebServerCommand.COMMAND).action(async (options) => {
  await container.get(WebServerCommand).execute();
});

program.parse(process.argv);
