import { IsNotEmpty } from 'class-validator';

export class UploadPostDto {
  userId: string;
  @IsNotEmpty({ message: 'Images are required' })
  images: string[];
  caption: string;
}

export class CommentSchema {
  userId: string;
  @IsNotEmpty({ message: 'Comment is required' })
  comment: string;
}
