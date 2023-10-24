// email.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { Otp } from '../entities/otp.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { generate as generateOtp } from 'otp-generator';
import constants from 'src/constants/constant.message';

@Injectable()
export class EmailService {
  private readonly transporter;

  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    // Create a Nodemailer transporter with your SMTP settings
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Your SMTP server host
      port: 587, // SMTP port (587 for TLS, 465 for SSL)
      secure: false, // Use TLS or SSL
      auth: {
        user: process.env.email, // Your email address
        pass: process.env.Security_Pass, // Your email password
      },
    });
  }

  async sendEmail(to: string): Promise<{ msg: string; success: boolean }> {
    const user = await this.userRepository.findOneBy({ email: to });
    console.log(user);
    if (!user) {
      return { msg: 'user not found', success: false };
    }

    const otpcreated = generateOtp(6, {
      digits: true, // Include digits (0-9)
      upperCase: false, // Exclude uppercase letters (A-Z)
      specialChars: false, // Exclude special characters (e.g., !@#$%^&*)
      alphabets: false, // Exclude alphabets (a-z)
    });

    const otpDatabase = {
      email: to,
      otp: otpcreated,
    };

    console.log(otpcreated, otpDatabase);

    await this.otpRepository.save(otpDatabase);

    // Create email data
    const mailOptions = {
      from: process.env.email,
      to,
      subject: 'this is your Email verification code',
      text: otpcreated,
    };

    // Send email
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return { msg: constants.Otp_Sent, success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async verifyEmail(otp: string, email: string) {
    const prevOtp = await this.otpRepository.findOneBy({ email: email });

    if (prevOtp && otp === prevOtp.otp) {
      await this.otpRepository.remove(prevOtp);

      const mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'Confirmation',
        text: 'You are success fully verified',
      };

      // Send email
      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return { msg: 'User Verified', success: true };
      } catch (error) {
        console.error('Error sending email:', error);
        throw error;
      }
    } else {
      return { msg: 'Otp not matched', success: false };
    }
  }
}
