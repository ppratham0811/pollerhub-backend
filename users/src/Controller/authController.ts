import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { UserData } from '../dto/DTO';
import { loginDto } from '../dto/login.dto';
import { UserService } from '../Services/user.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  
  ) {}

  @Post('/signup')
  signUpUser(@Body() userDetail: UserData) {
    return this.authService.signUpUser(userDetail);
  }

  @Post('/login')
  loginUser(@Body() userDetail: loginDto) {
    return this.authService.loginUser(userDetail);
  }
}
