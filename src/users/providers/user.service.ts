import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserParamDto } from '../dtos/createUserParam.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createuser.dto';

@Injectable()
export class UserService {
  // find all users
  constructor(
    // injecting auth service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    //injecting user entnty repository
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // find all users
  public findAll(createUserParamDto: CreateUserParamDto) {
    return this.userRepository.find({
      take: 10,
    });
  }

  // find user by id
  public findById(userId: number) {
    const isAuthed = this.authService.isAuth();

    this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  public async createUser(createUserDto: CreateUserDto) {
    //check user exists or not

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    let newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);

    return newUser;
  }
}
