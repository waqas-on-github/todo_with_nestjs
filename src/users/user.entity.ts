import { Role } from 'src/auth/enums/roles.enums';
import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  //

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 96, nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;
  // one user can have multiple posts
  @OneToMany(() => Post, (post) => post.author, { eager: true }) // many posts can have only one user
  posts: Post[];
}
