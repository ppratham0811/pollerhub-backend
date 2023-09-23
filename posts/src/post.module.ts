import { Module } from '@nestjs/common';
import { AppController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'prathamesh',
      password: 'root',
      database: 'senet',
      entities: [Post],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [PostService],
})
export class PostModule {
  constructor(private dataSource: DataSource) {}
}
