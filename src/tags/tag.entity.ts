import { Post } from 'src/posts/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true, length: 256 })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true, length: 512 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  schema: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  featuredImageUrl: string;

  @ManyToMany(() => Post, (post) => post.tags)
  post: Post[];

  // typeorm own helpers
  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
