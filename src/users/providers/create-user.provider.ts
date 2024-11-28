import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
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
    let existingUser = undefined;
    //check user exists or not
    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException();
    }

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // hashing password
    createUserDto.password = await this.hashingProvider.HashPassword(
      createUserDto.password,
    );

    let newUser = this.userRepository.create(createUserDto);
    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);

      throw new BadRequestException(
        'unable to process request at the moment please try again later ',
        {
          description: 'Error connecting db ',
        },
      );
    }

    return newUser;
  }
}
