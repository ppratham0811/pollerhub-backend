import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  location: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isPhoneVerified: boolean;

  @Column({ default: 'User' })
  role: string;

  @Column({ default: '' })
  bio: string;

  @Column('text', { array: true, default: [] })
  posts: string[];

  @Column('text', { array: true, default: [] })
  followers: number[];

  @Column('text', { array: true, default: [] })
  following: number[];
}
