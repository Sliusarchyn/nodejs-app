import * as dotenv from "dotenv";
import Port from "../value-object/port.vo";
import { injectable } from "inversify";

dotenv.config();

@injectable()
class RabbitmqConfig {
  hostname: string;
  username: string;
  password: string;
  port: Port;

  constructor(
  ) {
    const hostname = process.env.RABBIT_HOSTNAME ?? null;
    const username = process.env.RABBIT_USERNAME ?? null;
    const password = process.env.RABBIT_PASSWORD ?? null;
    const port = Number(process.env.RABBIT_PORT ?? null);

    if (null === hostname) {
      throw new Error('Hostname is invalid');
    }

    if (null === username) {
      throw new Error('username is invalid');
    }

    if (null === password) {
      throw new Error('password is invalid');
    }

    this.hostname = hostname;
    this.username = username;
    this.password = password;
    this.port = new Port(port);
  }
}

export { RabbitmqConfig };
