import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { databaseProviders } from './database.providers';

@Module({
  imports: [PostModule],
  providers: [...databaseProviders],
})
export class AppModule {}
