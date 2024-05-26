import { injectable } from "inversify";
import { Logger } from "../../../infrastructure/logger";
import { Command } from "commander";
import * as crypto from "node:crypto";

@injectable()
class SecretGenerateCommand {
  constructor(
    private readonly logger: Logger,
  ) {
  }

  public register(program: Command): void {
    program.command('jwt:secret-generate')
      .description('Generate JWT secret for .env file')
      .action(async () => {
        await this.execute();
      });
  }

  public async execute(): Promise<void> {
    const secret = crypto.randomBytes(128).toString('base64');

    this.logger.info(`JWT secret: ${secret}`);
  }
}

export { SecretGenerateCommand };
