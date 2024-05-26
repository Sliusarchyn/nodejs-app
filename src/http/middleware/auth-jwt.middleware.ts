import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Logger } from "../../infrastructure/logger";
import { injectable } from "inversify";
import { JwtConfig } from "../../config/jwt.config";
import Middleware from "./abstract.middleware";

declare global {
  namespace Express {
    export interface Request {
      sub?: string
    }
  }
}

@injectable()
export default class AuthJwtMiddleware extends Middleware {
  constructor(
    private readonly logger: Logger,
    private readonly jwtConfig: JwtConfig,
  ) {
    super();
  }


  public handle(req: Request, res: Response, next: NextFunction) {
    this.logger.debug('Handle JWT header');

    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    try {
      const clearToken = token.replace('Bearer ', '');

      const decoded = jwt.verify(clearToken, this.jwtConfig.secret) as JwtPayload;

      req.sub = decoded.sub;
      next();
    } catch (error) {
      res.status(401).json({error: 'Invalid token'});
    }
  }
}
