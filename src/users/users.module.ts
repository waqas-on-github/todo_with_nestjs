import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserProvider } from './providers/create-user.provider';

@Module({
  exports: [UserService],
  controllers: [UsersController],
  providers: [UserService, CreateUserProvider],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
