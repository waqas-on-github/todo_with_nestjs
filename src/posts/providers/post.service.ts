import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';

@Injectable()
export class PostService {
  // find all posts by user id
  constructor(private readonly userService: UserService) {}

  public findAll(userId: string) {
    const user = this.userService.findById(userId);
    return [
      {
        title: 'title 1',
        body: 'waqas is a good boy',
      },
      {
        id: 2,
        title: 'title 2',
        body: 'umair is a good boy',
        userId: 1,
      },
    ];
  }
}
