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

  async updatePost(postId: number, postData: Partial<Post>) {
    await this.postRepository
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

  async deletePost(postId: number) {
    await this.postRepository
      .createQueryBuilder(POST_REPOSITORY)
      .softDelete()
      .where('postId = :id', { id: postId })
      .execute();
  }

  async likePost(postId: number) {
    const getPost = await this.postRepository.findOneBy({
      postId,
    });
    await this.postRepository
      .createQueryBuilder(POST_REPOSITORY)
      .update(Post)
      .set({
        likes: getPost.likes + 1,
      })
      .where('postId = :id', { id: postId })
      .execute();
  }

  async commentOnPost(postId: number, userId: string, comment: string) {
    const getPost = await this.postRepository.findOneBy({ postId });
    const allComments = getPost.comments;
    allComments.push({ userId, comment });
    await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        comments: allComments,
      })
      .where('postId = :postId', { postId })
      .execute();
  }
}
