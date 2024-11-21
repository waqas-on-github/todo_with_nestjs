import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  abstract HashPassword(password: string | Buffer): Promise<string>;
  abstract VerifyPassword(
    password: string | Buffer,
    hash: string,
  ): Promise<boolean>;
}
