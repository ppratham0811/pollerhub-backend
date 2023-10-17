import {
  Query,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { UserData } from '../dto/DTO';
import { UserService } from '../Services/user.service';
import { ResetPassswordDto } from 'src/dto/resetPassword.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  GetCurrentUser(@Query('userId') userId: number) {
    return this.userService.getCurrentUser(userId);
  }
  @Put('/updated')
  UpdateUser(@Body() userData: UserData) {
    return this.userService.updateUser(userData);
  }
  @Delete()
  DeletUser(@Body('userID') userID: number) {
    return this.userService.deletUser(userID);
  }

  @Post(':loggedUserId/follow/:followedUserId')
  async addFollowing(
    @Param('loggedUserId') loggedUserId: number,
    @Param('followedUserId') followedUserId: number,
  ) {
    const result = await this.userService.addFollowing(
      loggedUserId,
      followedUserId,
    );
    if (result.success) {
      return result;
    } else {
      return { success: false, message: 'Something went wrong' };
    }
  }

  @Delete(':loggedUserId/follow/:followedUserId')
  async removeFollowing(
    @Param('loggedUserId') loggedUserId: number,
    @Param('followedUserId') followedUserId: number,
  ) {
    const result = await this.userService.removeFollower(
      loggedUserId,
      followedUserId,
    );
    if (result.success) {
      return result;
    } else {
      return { success: false, message: 'Something went wrong' };
    }
  }
  
  @Post('resetPassword')
  async ResetPassword(@Body('email')email:string){
    await this.userService.resetPassword(email)
  }

  @Post('resetPassword2')
  async ResetPasswordComplet(@Body()reserPasswordDto : ResetPassswordDto){
    console.log(reserPasswordDto);
  return   await this.userService.resetPasswordcomplete(reserPasswordDto)
  }

}
