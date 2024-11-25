import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BycryptProvider } from './providers/bycrypt.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './guards/access_token/access_token.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BycryptProvider,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
