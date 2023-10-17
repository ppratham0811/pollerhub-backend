import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class TokenValidator implements NestMiddleware{
    async  use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;

        if (!token) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
    
        jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Token is not valid' });
          }
    
          // Attach the decoded token payload to the request object for later use
        //   req.user = decoded;
    
          next();
    })
  }
} 