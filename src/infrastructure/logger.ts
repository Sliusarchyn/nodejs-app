import winston from 'winston';
import { injectable } from "inversify";
import { AppConfig } from "../config/app.config";

@injectable()
class Logger {
  private logger: winston.Logger;

  constructor(appConfig: AppConfig) {
    this.logger = winston.createLogger({
      level: appConfig.logLevel,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `[${info.level}][${info.timestamp}] ${info.message}`)
      ),
      transports: [
        new winston.transports.Console(),
      ],
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
      },
      exitOnError: false
    });
  }

  public info(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  public debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
  }

  public warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
  }
}

export { Logger };
