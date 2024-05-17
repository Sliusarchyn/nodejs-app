import { Express, NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import * as core from "express-serve-static-core";

@injectable()
export default abstract class Middleware {

  protected abstract handle(req: Request, res: Response, next: NextFunction): void;

  public bind(app: Express | core.Router): Express | core.Router {
    app.use(this.handle.bind(this));

    return app;
  }
}
