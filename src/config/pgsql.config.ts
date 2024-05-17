import * as dotenv from "dotenv";
import Port from "../value-object/port.vo";
import { injectable } from "inversify";

dotenv.config();

@injectable()
class PgsqlConfig {
  hostname: string;
  database: string;
  username: string;
  password: string;
  port: Port;

  constructor(
  ) {
    const hostname = process.env.PG_HOSTNAME ?? null;
    const database = process.env.PG_DATABASE ?? null;
    const username = process.env.PG_USERNAME ?? null;
    const password = process.env.PG_PASSWORD ?? null;
    const port = Number(process.env.PG_PORT ?? null);

    if (null === hostname) {
      throw new Error('Hostname is invalid');
    }

    if (null === database) {
      throw new Error('Database is invalid');
    }

    if (null === username) {
      throw new Error('username is invalid');
    }

    if (null === password) {
      throw new Error('password is invalid');
    }

    this.hostname = hostname;
    this.database = database;
    this.username = username;
    this.password = password;
    this.port = new Port(port);
  }
}

export { PgsqlConfig };
