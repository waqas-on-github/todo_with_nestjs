import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './providers/post.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptions } from 'src/meta-options/metaOptions.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    UsersModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOptions]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
      