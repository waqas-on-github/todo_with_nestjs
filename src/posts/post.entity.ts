import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType } from './enums/postType.enum';
import { PostStatus } from './enums/postStatus.enums';
import { MetaOptions } from 'src/meta-options/metaOptions.entity';

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

  @Column()
  tags: string;
}
