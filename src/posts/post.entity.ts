import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType } from './enums/postType.enum';
import { PostStatus } from './enums/postStatus.enums';
import { MetaOptions } from 'src/meta-options/metaOptions.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 512, nullable: false })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: PostType.PAGE,
  })
  postType: PostType;

  @Column({ type: 'varchar', length: 512, unique: true, nullable: false })
  slug: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    nullable: false,
    default: PostStatus.REVIEW,
  })
  status: PostStatus;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'text', nullable: true })
  schema: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  featureImageUrl?: string;

  @Column({ type: 'timestamp', nullable: true })
  publishOn: Date;

  // one to one relationship with meta option table
  @OneToOne(() => MetaOptions, (metaoption) => metaoption.post, {
    cascade: true,
    eager: true,
  })
  metaOptions: MetaOptions;

  // each post can have only one author be in many side of the one to many
  // forgen key will reside on many side so here
  @ManyToOne(() => User, (user) => user.posts) // one user can have many posts
  author: User;

  // bidirectional many to many relationship
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
