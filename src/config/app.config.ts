import * as dotenv from 'dotenv';
import { injectable } from "inversify";
import { PgsqlConfig } from "./pgsql.config";
import Port from "../value-object/port.vo";
import { JwtConfig } from "./jwt.config";

dotenv.config();

@injectable()
export class AppConfig {
  public readonly appPort: Port;
  public readonly appHost: string;
  public readonly sslKeyPath?: string;
  public readonly sslCertPath?: string;
  public readonly logLevel: string;
  public readonly pgsql: PgsqlConfig;
  public readonly jwt: JwtConfig;

  constructor(
    pgsqlConfig: PgsqlConfig,
    jwtConfig: JwtConfig,
  ) {
    this.appPort = new Port(Number(process.env.APP_PORT ?? 8080));
    this.appHost = process.env.APP_HOST ?? '127.0.0.1';
    this.sslKeyPath = process.env.APP_SSL_KEY_PATH ?? undefined;
    this.sslCertPath = process.env.APP_SSL_CERT_PATH ?? undefined;
    this.logLevel = process.env.LOG_LEVEL ?? 'info';
    this.pgsql = pgsqlConfig;
    this.jwt = jwtConfig;
  }
}
