import { Request, Response, Router } from "express";
import { Logger } from "../../../infrastructure/logger";
import { injectable } from "inversify";
import ApiController from "../api.controller";

@injectable()
class HealthCheckController extends ApiController {
  constructor(
    private readonly logger: Logger,
  ) {
    super();
  }

  public async registerRoute(router: Router): Promise<void> {
    const pattern = '/api/health-check';
    this.logger.debug(`Route: [GET]: ${pattern} <HealthCheckController>`);

    router.get(pattern, this.invoke.bind(this));
  }

  protected async invoke(request: Request, response: Response): Promise<void> {
    response.status(200)
      .setHeader('Content-Type', 'application/json')
      .send(JSON.stringify({ status: 'OK' }));
  }
}

export default HealthCheckController;
