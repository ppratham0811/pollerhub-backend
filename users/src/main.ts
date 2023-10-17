import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  console.log(app.get(ConfigService).get('DB_PASSWORD'));
  await app.listen(3000);
}
bootstrap();
