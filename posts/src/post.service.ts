import { Injectable } from '@nestjs/common';
import { UploadPostDto } from './DTO';

@Injectable()
export class PostService {
  getAllPosts(): string {
    return 'All Posts';
  }

  uploadNewPost(postData: UploadPostDto): string {
    console.log(postData);
    return 'Route for uploading new post';
  }

  updatePost(postId: string, postData: UploadPostDto): string {
    console.log(postId, postData);
    return 'route for updating post';
  }

  deletePost(postId: string): string {
    console.log(postId);
    return 'route for deleting post';
  }

  likePost(postId: string): string {
    console.log(postId);
    return 'post liked';
  }

  commentOnPost(postId: string, userId: string, comment: string): string {
    console.log(postId, userId, comment);
    return 'post comment';
  }
}
