import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostType } from './enums/postType.enum';
import { PostStatus } from './enums/postStatus.enums';
import { CreatePostMetaOptionsDto } from '../meta-options/dtos/createPostMetaOptions.dto';

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

  //we will work on next lacture
  @Column()
  tags: string;
  @Column()
  metaOptions: string;
}
