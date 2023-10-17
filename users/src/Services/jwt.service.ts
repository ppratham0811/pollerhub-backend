import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  // Generates a new JWT token
  sign(payload: any): string {
    const secret = process.env.JWT_SECRET // Get your JWT secret from your configuration
    const options = {
      expiresIn: '15m', // Set the token expiration time (adjust as needed)
    };
    return jwt.sign(payload, secret, options);
  }
}
