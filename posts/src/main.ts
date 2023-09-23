import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function startApplication() {
  const app = await NestFactory.create<NestExpressApplication>(PostModule, {
    abortOnError: false,
  });
  await app.listen(3000);
}
startApplication();
