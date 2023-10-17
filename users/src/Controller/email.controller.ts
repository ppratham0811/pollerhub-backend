// email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '../Services/email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body('to') to: string): Promise<{ msg: string; success: boolean }> {
    try {
      return await this.emailService.sendEmail(to);
      
    } catch (error) {
      
      return { msg: `Failed to send email: ${error.message}`, success: false }
    }

  }
  @Post('verify')
  async verifyMail(@Body('otp') otp: string, @Body('email') email: string) {
     return await this.emailService.verifyEmail(otp, email);
  }
}
