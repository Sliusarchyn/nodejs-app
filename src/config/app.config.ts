import * as dotenv from 'dotenv';
import { injectable } from "inversify";
import { RabbitmqConfig } from "./rabbitmq.config";
import Port from "../value-object/port.vo";

dotenv.config();

@injectable()
export class AppConfig {
  public readonly appPort: Port;
  public readonly logLevel: string;
  public readonly rabbitConfig: RabbitmqConfig;

  constructor(
    rabbitConfig: RabbitmqConfig
  ) {
    this.appPort = new Port(Number(process.env.APP_PORT ?? 8080));
    this.logLevel = process.env.LOG_LEVEL ?? 'info';
    this.rabbitConfig = rabbitConfig;
  }
}
