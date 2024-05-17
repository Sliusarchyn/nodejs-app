import { Container, interfaces } from "inversify";
import { AppConfig } from "./app.config";
import { PgsqlConfig } from "./pgsql.config";
import { ServerStartCommand } from "../cli/server-start.command";
import { Logger } from "../infrastructure/logger";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";
import HealthCheckController from "../http/controller/api/health-check.controller";
import { JwtConfig } from "./jwt.config";
import AuthJwtMiddleware from "../http/middleware/auth-jwt.middleware";
import LogMiddleware from "../http/middleware/log.middleware";

const container = new Container();

//Core
container.bind<Logger>(Logger).to(Logger).inSingletonScope();

//Config
container.bind<AppConfig>(AppConfig).to(AppConfig).inSingletonScope();
container.bind<JwtConfig>(JwtConfig).to(JwtConfig).inSingletonScope();
container.bind<PgsqlConfig>(PgsqlConfig).to(PgsqlConfig).inSingletonScope();

//TypeORM
container.bind<DataSourceOptions>('DataSourceOptions').toDynamicValue((context: interfaces.Context) => {
  const config = context.container.get(AppConfig);

  return {
    type: "postgres",
    host: config.pgsql.hostname,
    port: config.pgsql.port.getValue(),
    username: config.pgsql.username,
    password: config.pgsql.password,
    database: config.pgsql.database,
    entities: [join(__dirname, '../entities/*.entity.{js,ts}')],
    logging: false,
    synchronize: false,
    migrations: [join(__dirname, '../infrastructure/database/migrations/*.{js,ts}')],
    migrationsTableName: 'migrations',
  } as DataSourceOptions;
}).inSingletonScope();
container.bind<DataSource>(DataSource).toDynamicValue((context: interfaces.Context) => {
  const dataSourceConfig = context.container.get<DataSourceOptions>('DataSourceOptions');

  return new DataSource(dataSourceConfig);
}).inSingletonScope();

//Repositories

//Services

//Commands
container.bind<ServerStartCommand>(ServerStartCommand).to(ServerStartCommand);

//Controllers
container.bind<HealthCheckController>(HealthCheckController).to(HealthCheckController).inRequestScope();

//Middleware
container.bind<LogMiddleware>(LogMiddleware).to(LogMiddleware).inSingletonScope();
container.bind<AuthJwtMiddleware>(AuthJwtMiddleware).to(AuthJwtMiddleware).inSingletonScope();

export { container };
