import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { typeormConfig } from './config/typeorm.config';
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), PostModule],
})
export class AppModule {}
