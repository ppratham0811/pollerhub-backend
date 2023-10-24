import { DataSource } from 'typeorm';
import { Post } from 'src/modules/post/entities/post.entity';
import { POST_REPOSITORY, DATA_SOURCE } from 'src/constants';

export const postProviders = [
  {
    provide: POST_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: [DATA_SOURCE],
  },
];
