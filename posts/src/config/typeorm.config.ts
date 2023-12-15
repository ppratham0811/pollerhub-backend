import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostEntity } from 'src/post/post.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'prathamesh',
  password: 'root',
  database: 'senet',
  entities: [PostEntity],
  synchronize: true,
};
