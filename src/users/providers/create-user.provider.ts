import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createuser.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  //check user exists or not
  constructor(
    //injecting user entnty repository
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // inject hashing provider
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    //check user exists or not
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // hashing password
    createUserDto.password = await this.hashingProvider.HashPassword(
      createUserDto.password,
    );

    console.log(createUserDto);

    let newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);

    return newUser;
  }
}
