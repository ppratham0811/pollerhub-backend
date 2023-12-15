import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { UploadPostDto } from './DTO';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

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
    @Param('id', ParseIntPipe) postId: number,
    @Body() uploadPostDto: Partial<PostEntity>,
  ) {
    return this.postService.updatePost(postId, uploadPostDto);
  }

  @Delete(':id/delete')
  async deletePost(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.deletePost(postId);
  }

  @Post(':id/like')
  async likePost(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.likePost(postId);
  }

  @Post(':id/comment')
  async commentOnPost(
    @Param('id', ParseIntPipe) postId: number,
    @Body() userComment: { userId: string; comment: string },
  ) {
    return this.postService.commentOnPost(postId, userComment);
  }
}
