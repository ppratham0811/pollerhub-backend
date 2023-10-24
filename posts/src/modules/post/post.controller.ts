import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './entities/post.entity';
import { UploadPostDto } from './DTO';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Post('/upload')
  async uploadNewPost(@Body() uploadPostDto: UploadPostDto) {
    return this.postService.uploadNewPost(uploadPostDto);
  }

  @Put(':id/update')
  async updatePost(
    @Param('id') postId: number,
    @Body() uploadPostDto: Partial<Post>,
  ) {
    return this.postService.updatePost(postId, uploadPostDto);
  }

  @Delete(':id/delete')
  async deletePost(@Param('id') postId: number) {
    return this.postService.deletePost(postId);
  }

  @Post(':id/like')
  async likePost(@Param('id') postId: number) {
    return this.postService.likePost(postId);
  }

  @Post(':id/comment')
  async commentOnPost(
    @Param('id') postId: number,
    @Body() userComment: { userId: string; comment: string },
  ) {
    return this.postService.commentOnPost(
      postId,
      userComment.userId,
      userComment.comment,
    );
  }
}
