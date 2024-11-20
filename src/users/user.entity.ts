import { Post } from 'src/posts/post.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  //

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 96, nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  password: string;

  // one user can have multiple posts
  @OneToMany(() => Post, (post) => post.author) // many posts can have only one user
  posts: Post[];
}
