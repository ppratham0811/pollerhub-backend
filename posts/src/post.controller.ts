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
import { UploadPostDto } from './DTO';

@Controller('/posts')
export class AppController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  getAllPosts(): string {
    return this.postService.getAllPosts();
  }

  @Post('/upload')
  async uploadNewPost(@Body() uploadPostDto: UploadPostDto) {
    console.log(uploadPostDto);
    return this.postService.uploadNewPost(uploadPostDto);
  }

  @Put(':id/update')
  async updatePost(
    @Param('id') postId: string,
    @Body() uploadPostDto: UploadPostDto,
  ) {
    console.log(postId);
    return this.postService.updatePost(postId, uploadPostDto);
  }

  @Delete(':id/delete')
  async deletePost(@Param('id') postId: string) {
    console.log(postId);
    return this.postService.deletePost(postId);
  }

  @Post(':id/like')
  async likePost(@Param('id') postId: string) {
    console.log(postId);
    return this.postService.likePost(postId);
  }

  @Post(':id/comment')
  async commentOnPost(
    @Param('id') postId: string,
    @Body() userComment: { userId: string; comment: string },
  ) {
    console.log(postId);
    return this.postService.commentOnPost(
      postId,
      userComment.userId,
      userComment.comment,
    );
  }
}
