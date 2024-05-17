import { NextFunction, Request, Response } from "express";
import { Logger } from "../../infrastructure/logger";
import { injectable } from "inversify";
import Middleware from "./abstract.middleware";

@injectable()
export default class LogMiddleware extends Middleware {
  constructor(
    private readonly logger: Logger,
  ) {
    super();
  }

  public async handle(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`${req.ip} - "${req.method} ${req.path} HTTP/${req.httpVersion}" ${res.statusCode} - ${req.header('user-agent')}`);

    next();
  }
}
