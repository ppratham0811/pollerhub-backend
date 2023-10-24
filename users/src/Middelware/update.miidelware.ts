// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { validate } from 'email-validator';
// import constants from 'src/constants/constant.message';
// import { Validator } from '../Middelware/password.validator';
// import { User } from 'src/entities/user.entity';
//   import { InjectRepository } from '@nestjs/typeorm';
//   import { Repository } from 'typeorm';

// @Injectable()
// export class UpdateMiddleware implements NestMiddleware {
//   constructor(
//     @InjectRepository(User) private readonly userRepository: Repository<User>,
//   ) {}
//   async use(req: Request, res: Response, next: NextFunction) {

//     const validator = new Validator();

//     // checking the correct formate of email
//     if (!validate(req.body.email)) {
//       return res.status(401).json({ msg: constants.Email_Format_Not_Valid,success:false });
//     }

//     //checking strength of password
//     if (!validator.validatePassword(req.body.password)) {
//       return res.status(401).json({ msg: constants.Password_invalid ,success:false});
//     }

//     // checking if email is alredy exist or not
//     const existingUser = await this.userRepository.findOneBy({
//       email: req.body.email,
//     });

//     if (existingUser) {
//       return res.status(401).json({ msg: constants.Email_Already_Exists ,success:false});
//     }

//     //   checking for duplicate username
//     const existingUsername = await this.userRepository.findOneBy({
//       username: req.body.username,

//     });

//     if (existingUsername) {
//       // return constants.UserName_Already_Exists;
//       return res.status(401).json({ msg: constants.UserName_Already_Exists,success:false });
//     }

//     next();
//   }
// }

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'email-validator';
import constants from 'src/constants/constant.message';
import { Validator } from '../Middelware/password.validator';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const validator = new Validator();

    // Check if the email is being updated
    const isEmailUpdated =
      req.body.email !== undefined && req.body.email !== null;

    // Check if the password is being updated
    const isPasswordUpdated =
      req.body.password !== undefined && req.body.password !== null;

    // Checking the correct format of email if it's being updated
    if (isEmailUpdated && !validate(req.body.email)) {
      return res
        .status(401)
        .json({ msg: constants.Email_Format_Not_Valid, success: false });
    }

    // Checking strength of password if it's being updated
    if (isPasswordUpdated && !validator.validatePassword(req.body.password)) {
      return res
        .status(401)
        .json({ msg: constants.Password_invalid, success: false });
    }

    // Checking if email is already exist if it's being updated
    if (isEmailUpdated) {
      const existingUserWithEmail = await this.userRepository.findOneBy({
        email: req.body.email,
      });

      if (existingUserWithEmail) {
        return res
          .status(401)
          .json({ msg: constants.Email_Already_Exists, success: false });
      }
    }

    // Checking for duplicate username if it's being updated
    if (req.body.username !== undefined && req.body.username !== null) {
      const existingUsername = await this.userRepository.findOneBy({
        username: req.body.username,
      });

      if (existingUsername) {
        return res
          .status(401)
          .json({ msg: constants.UserName_Already_Exists, success: false });
      }
    }

    next();
  }
}
