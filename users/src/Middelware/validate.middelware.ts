import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'email-validator';
import constants from 'src/constants/constant.message';
import { Validator } from '../Middelware/password.validator';
import { User } from 'src/entities/user.entity';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    
    const validator = new Validator();

    // checking the correct formate of email
    if (!validate(req.body.email)) {
      return res.status(401).json({ msg: constants.Email_Format_Not_Valid,success:false });
    }

    //checking strength of password
    if (!validator.validatePassword(req.body.password)) {
      return res.status(401).json({ msg: constants.Password_invalid ,success:false});
    }

    // checking if email is alredy exist or not
    const existingUser = await this.userRepository.findOneBy({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(401).json({ msg: constants.Email_Already_Exists ,success:false});
    }

    //   checking for duplicate username
    const existingUsername = await this.userRepository.findOneBy({
      username: req.body.username,
      
    });

    if (existingUsername) {
      // return constants.UserName_Already_Exists;
      return res.status(401).json({ msg: constants.UserName_Already_Exists,success:false });
    }

    next();
  }
}
