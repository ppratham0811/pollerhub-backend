import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentSchema, UploadPostDto } from './DTO';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  @UsePipes(ValidationPipe)
  uploadNewPost(postData: UploadPostDto): Promise<PostEntity> {
    const newPost = this.postRepository.create(postData);
    return this.postRepository.save(newPost);
  }

  async updatePost(postId: number, postData: Partial<PostEntity>) {
    await this.postRepository
      .createQueryBuilder()
      .update(PostEntity)
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
      .createQueryBuilder()
      .softDelete()
      .where('postId = :id', { id: postId })
      .execute();
  }

  async likePost(postId: number) {
    const getPost = await this.postRepository.findOneBy({
      postId,
    });
    await this.postRepository
      .createQueryBuilder()
      .update(PostEntity)
      .set({
        likes: getPost.likes + 1,
      })
      .where('postId = :id', { id: postId })
      .execute();
  }

  @UsePipes(ValidationPipe)
  async commentOnPost(postId: number, comment: CommentSchema) {
    const getPost = await this.postRepository.findOneBy({ postId });
    const allComments = getPost.comments;
    allComments.push({ userId: comment.userId, comment: comment.comment });
    await this.postRepository
      .createQueryBuilder()
      .update(PostEntity)
      .set({
        comments: allComments,
      })
      .where('postId = :postId', { postId })
      .execute();
  }
}
