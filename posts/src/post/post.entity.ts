import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommentSchema } from './DTO';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  userId: string;

  @Column()
  caption: string;

  @Column('jsonb', { array: true })
  images: string[];

  @Column('jsonb', { array: true })
  comments: CommentSchema[];

  @Column()
  likes: number;
}
