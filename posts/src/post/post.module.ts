import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';

@Module({
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService],
})
export class PostModule {}
