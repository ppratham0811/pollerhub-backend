import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import constants from '../constants/constant.message';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginMiddelware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    //checking if user is valid or not
    const existingUser = await this.userRepository.findOneBy({
      email: req.body.email,
    });
    if (!existingUser) {
      return res
        .status(401)
        .json({ msg: constants.USER_NOT_FOUND, success: false });
    }

    //mathing password

    const isMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );

    if (!isMatch) {
      return res
        .status(401)
        .json({ msg: constants.Password_invalid, success: false });
    }

    next();
  }
}
