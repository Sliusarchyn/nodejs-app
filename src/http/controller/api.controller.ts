import { Express, Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
abstract class ApiController {
  public abstract registerRoute(app: Express): Promise<void>;

  protected abstract invoke(request: Request, response: Response): Promise<void>;
}

export default ApiController;
