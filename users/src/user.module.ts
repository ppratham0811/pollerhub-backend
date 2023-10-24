import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './Controller/user.controller';
import { AuthService } from './Services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { LoggerMiddleware } from './Middelware/validate.middelware';
import { LoginMiddelware } from './Middelware/loginDetail.middelware';
import { JwtService } from './Services/jwt.service';
import { UserService } from './Services/user.service';
import { TokenValidator } from './Middelware/tokenValidate.middleware';
import { AuthController } from './Controller/authController';
import { UpdateMiddleware } from './Middelware/update.miidelware';
import { EmailController } from './Controller/email.controller';
import { EmailService } from './Services/email.service';
import { Otp } from './entities/otp.entity';
import { ImageController } from './Controller/image.controller';
import { Image } from './entities/Image.entity';
import { ImageService } from './Services/Image.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config service available globally
      envFilePath: ['.local.env'], // Path to your .env file
    }),
    // setting conection with database
    TypeOrmModule.forFeature([User, Otp, Image]),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.local.env',
          // envFilePath : ".prod.env"
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        entities: [User, Otp, Image],
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    UserController,
    AuthController,
    EmailController,
    ImageController,
  ],
  providers: [AuthService, JwtService, UserService, EmailService, ImageService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('auth/signup');
    consumer.apply(LoginMiddelware).forRoutes('auth/login');
    consumer.apply(TokenValidator).forRoutes('user', 'email/send');
    consumer.apply(TokenValidator, UpdateMiddleware).forRoutes('user/updated');
  }
}
