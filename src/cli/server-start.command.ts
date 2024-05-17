import { injectable } from "inversify";
import express, { Express, Request, Response } from "express";
import { AppConfig } from "../config/app.config";
import { Logger } from "../infrastructure/logger";
import { Command } from "commander";
import { container } from "../config/container.config";
import HealthCheckController from "../http/controller/api/health-check.controller";
import { DataSource } from "typeorm";
import AuthJwtMiddleware from "../http/middleware/auth-jwt.middleware";
import LogMiddleware from "../http/middleware/log.middleware";

@injectable()
class ServerStartCommand {
  constructor(
    private readonly appConfig: AppConfig,
    private readonly logger: Logger,
  ) {
  }

  public register(program: Command): void {
    program.command('server:start')
      .description('Start HTTP/HTTPS server')
      .action(async () => {
        await this.execute();
      });
  }

  public async execute(): Promise<void> {
    const app: Express = express();

    container.get(LogMiddleware).bind(app);

    app.use(async (req: Request, res: Response, next) => {
      const dataSource = container.get(DataSource);

      if (!dataSource.isInitialized) {
        await dataSource.initialize();
      }

      next();
    });

    const apiPublicRouter = express.Router()
    const apiPrivateRouter = express.Router()
    apiPublicRouter.use(express.json());
    apiPrivateRouter.use(express.json());

    container.get(AuthJwtMiddleware).bind(apiPrivateRouter);

    await container.get(HealthCheckController).registerRoute(apiPublicRouter);

    app.use(apiPublicRouter);
    app.use(apiPrivateRouter);

    app.listen(this.appConfig.appPort.getValue(), this.appConfig.appHost, () => {
      this.logger.info(`Server is running at http://${this.appConfig.appHost}:${this.appConfig.appPort.getValue()}`);
    });
  }
}

export { ServerStartCommand };
