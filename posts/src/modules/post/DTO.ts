export class UploadPostDto {
  userId: string;
  images: string[];
  caption: string;
}

export class CommentSchema {
  userId: string;
  comment: string;
}
