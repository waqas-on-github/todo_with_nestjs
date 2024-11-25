import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createuser.dto';
import { CreateUserProvider } from './create-user.provider';
import { HfInference } from '@huggingface/inference';

const client = new HfInference('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');

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

    //inject create user provider
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  // find all users
  public async findAll() {
    return await this.userRepository.find({ relations: { posts: true } });
  }

  // find user by id
  public async findById(userId: number) {
    return await this.userRepository.findOneBy({
      id: userId,
    });
  }

  public async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }

  // delete all users
  public async deleteUsers() {
    return await this.userRepository.delete({});
  }

  public async testApi(prompt: string) {
    const chatCompletion = await client.chatCompletion({
      model: 'Qwen/Qwen2.5-Coder-7B-Instruct',
      messages: [
        {
          role: 'user',
          content: 'What is the capital of France?',
        },
      ],
      max_tokens: 500,
    });

    console.log(chatCompletion.choices[0].message);
    return chatCompletion.choices[0].message;
  }
}
