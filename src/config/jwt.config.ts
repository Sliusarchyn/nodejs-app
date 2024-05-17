import * as dotenv from 'dotenv';
import { injectable } from "inversify";

dotenv.config();

@injectable()
export class JwtConfig {
  public readonly secret: string;
  public readonly ttl: number;

  constructor() {
    const secret = process.env.JWT_SECRET ?? null;

    if (null === secret) {
      throw new Error('JWT secret is invalid');
    }

    this.secret = secret;
    this.ttl = Number(process.env.JWT_TTL ?? 3600);
  }
}
