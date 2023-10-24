import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserData } from '../dto/DTO';
import constants from '../constants/constant.message';
import { loginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //creating new User

  async signUpUser(
    createUser: UserData,
  ): Promise<{ message: string; success: Boolean }> {
    try {
      let user = new User();
      user.firstName = createUser.firstName;
      user.lastName = createUser.lastName;
      user.email = createUser.email;
      user.username = createUser.username;
      user.location = createUser.lastName;
      user.phone = createUser.phone;
      user.profileImageUrl = createUser.profileImageUrl;
      user.password = await bcrypt.hash(createUser.password, 10); // saving password in hash formate

      //saving user detail to database

      await this.userRepository.save(user);
      return { message: 'User Created', success: true };
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  //signup User and genrating token

  async loginUser(userData: loginDto) {
    //getting data of user for creating token
    const data = await this.userRepository.findOneBy({ email: userData.email });

    const user = { id: data.userId, username: data.username };

    //generating token

    const token = this.jwtService.sign(user);

    return { message: constants.LOGIN_SUCCESSFUL, token: token };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
