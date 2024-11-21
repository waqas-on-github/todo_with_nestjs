import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcryptjs'; // Correct import

@Injectable()
export class BycryptProvider implements HashingProvider {
  async HashPassword(password: string): Promise<string> {
    // Use bcrypt.hash directly
    return bcrypt.hash(password, 10);
  }

  async VerifyPassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    // Use bcrypt.compare directly
    return bcrypt.compare(password, encryptedPassword);
  }
}
