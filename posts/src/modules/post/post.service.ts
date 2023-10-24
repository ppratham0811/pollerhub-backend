import { Injectable } from '@nestjs/common';
import { UploadPostDto } from './DTO';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { POST_REPOSITORY } from 'src/constants';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post, POST_REPOSITORY)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  uploadNewPost(postData: UploadPostDto): Promise<Post> {
    const newPost = this.postRepository.create(postData);
    return this.postRepository.save(newPost);
  }

  async updatePost(postId: number, postData: Partial<Post>): Promise<Post> {
    return this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        userId: postData.userId,
        caption: postData.caption,
        images: postData.images,
      })
      .where('postId = :id', { id: postId })
      .execute();
  }

  deletePost(postId: number) {
    await this.postRepository
      .createQueryBuilder('users')
      .softDelete()
      .where('postId = :id', { id: postId })
      .execute();
  }

  likePost(postId: number): string {
    console.log(postId);
    return 'post liked';
  }

  commentOnPost(postId: number, userId: string, comment: string): string {
    console.log(postId, userId, comment);
    return 'post comment';
  }
}
