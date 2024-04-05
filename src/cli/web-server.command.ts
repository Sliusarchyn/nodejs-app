import { injectable } from "inversify";
import { AppConfig } from "../config/app.config";
import { Logger } from "../infrastructure/logger";

@injectable()
class WebServerCommand {
  static COMMAND = 'server:start';

  constructor(
    private readonly appConfig: AppConfig,
    private readonly logger: Logger,
  ) {
  }

  public async execute(): Promise<number> {
    this.logger.info(`HTTP server starting on port ${this.appConfig.appPort.getValue()}...`);

    await new Promise(resolve => setTimeout(resolve, 1000));
    this.logger.error('Callback error');
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.logger.debug('Debug some variable: 1');
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.logger.warn('Warning');
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.logger.info('Server started!');

    return 0;
  }
}

export { WebServerCommand };
