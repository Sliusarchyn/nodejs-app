"use strict";

import "reflect-metadata";
import { program } from 'commander';
import { container } from "./config/container.config";
import { DataSource } from "typeorm";
import { Logger } from "./infrastructure/logger";
import { ServerStartCommand } from "./cli/server-start.command";

async function app() {
  program.name('CLI WA Pre-Heater')
    .description('CLI')
    .version('1.0.0');

  const logger = container.get(Logger);

  logger.debug('Register CLI commands');
  container.get(ServerStartCommand).register(program);

  logger.debug('Initialize DB connection');

  await container.get(DataSource).initialize().then(() => {
    logger.debug('Data Source has been initialized!');
  }).catch((err) => {
    logger.error(`Error during Data Source initialization: ${err.message}`);
  });

  await program.parseAsync(process.argv);

  await container.get(DataSource).destroy();
}

app();
