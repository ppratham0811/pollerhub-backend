import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import constants from 'src/constants/constant.message';
import { UserData } from 'src/dto/DTO';
import { EmailService } from './email.service';
import { ResetPassswordDto } from 'src/dto/resetPassword.dto';
import { Validator } from 'src/Middelware/password.validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly emailServie: EmailService,
  ) {}

  // fetching current user data from database
  async getCurrentUser(userID: number) {
    const user = await this.userRepository.findOneBy({
      userId: userID,
    });

    if (!user) {
      return { curretnUser: constants.USER_NOT_FOUND, success: false };
    }

    return { curretnUser: user, success: true };
  }

  //Updating User

  async updateUser(updated: UserData) {
    const data = await this.userRepository.update(
      { userId: updated.userId },
      updated,
    );
    return { updatedUser: data.affected, success: true };
  }

  async deletUser(userId: number) {
    const user = await this.userRepository.findOneBy({ userId: userId });
    if (!user) {
      return { msg: constants.USER_NOT_FOUND, success: false };
    }
    // Delete the user from the database
    try {
      await this.userRepository.remove(user);
      return { msg: 'User deleted successfully', success: true };
    } catch (error) {
      // Handle database error if necessary
      console.error('Error deleting user:', error);
      return { msg: 'Failed to delete user', success: false };
    }
  }

  //adding followers

  async addFollowing(loggedUserId: number, followedUserId: number) {
    const loggedUser = await this.userRepository.findOneBy({
      userId: loggedUserId,
    });
    const followedUser = await this.userRepository.findOneBy({
      userId: followedUserId,
    });

    if (!loggedUser || !followedUser) {
      return null; // Handle user not found
    }

    if (loggedUser.userId === followedUser.userId) {
      return { msg: constants.SOMETHING_WENT_WRONG, success: false };
    }

    // Check if loggedUser.userId is already in followedUser.followers

    for (var i = 0; i < followedUser.followers.length; i++) {
      if (followedUser.followers[i] == loggedUser.userId) {
        return { msg: 'already following', success: false };
      }
    }

    await loggedUser.following.push(followedUser.userId);

    await followedUser.followers.push(loggedUser.userId);

    await this.userRepository.save([loggedUser, followedUser]);

    return { success: true, loggedUser, followedUser };
  }

  // removing followers

  async removeFollower(loggedUserId: number, followerUserId: number) {
    const loggedUser = await this.userRepository.findOneBy({
      userId: loggedUserId,
    });
    const follwerUser = await this.userRepository.findOneBy({
      userId: followerUserId,
    });

    if (!loggedUser && !follwerUser) {
      return { msg: constants.USER_NOT_FOUND, success: false }; // Handle user not found
    }

    // Check if followerUserId is in loggedUser's followers list
    const indexOfFollowing = loggedUser.following.indexOf(followerUserId);
    const indexofFollwer = follwerUser.followers.indexOf(loggedUserId);

    if (indexOfFollowing === -1) {
      return { msg: 'Follower not found', success: false };
    }

    if (indexofFollwer === -1) {
      return { msg: 'Follower not found', success: false };
    }

    // Remove the followerUserId from loggedUser's followers list
    loggedUser.following.splice(indexOfFollowing, 1);
    follwerUser.followers.splice(indexofFollwer, 1);

    // Save the updated user
    await this.userRepository.save([loggedUser, follwerUser]);

    return { success: true, loggedUser };
  }

  //reset password

  async resetPassword(email: string) {
    const getUser = await this.userRepository.findOneBy({ email: email });

    if (!getUser) {
      return { msg: constants.USER_NOT_FOUND, success: false };
    }

    this.emailServie.sendEmail(email);
  }

  async resetPasswordcomplete(resetPasswordDto: ResetPassswordDto) {
    const validator = new Validator();
    console.log(resetPasswordDto.email);
    const getUser = await this.userRepository.findOneBy({
      email: resetPasswordDto.email,
    });

    if (!getUser) {
      return { msg: constants.USER_NOT_FOUND, success: false };
    }

    const otpVerification = this.emailServie.verifyEmail(
      resetPasswordDto.otp,
      resetPasswordDto.email,
    );

    if ((await otpVerification).success) {
      if (resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword) {
        return { msg: constants.INCORRECT_CREDENTIALS, success: false };
      }
      //checking strength of password
      if (!validator.validatePassword(resetPasswordDto.newPassword)) {
        return { msg: constants.Password_invalid, success: false };
      }

      getUser.password = resetPasswordDto.newPassword;
      await this.userRepository.save(getUser);
      return { msg: 'Password reset successful', success: true };
    } else {
      return { msg: 'OTP verification failed', success: false };
    }
  }
}
