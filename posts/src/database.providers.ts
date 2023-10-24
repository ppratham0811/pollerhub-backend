import { DataSource } from 'typeorm';
import { Post } from './modules/post/entities/post.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'prathamesh',
        password: 'root',
        database: 'senet',
        entities: [Post],
        synchronize: true, // not to be used in production
      });

      return dataSource.initialize();
    },
  },
];
