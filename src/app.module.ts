import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { schema } from './env.schema';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TagsModule,
    MetaOptionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validate: (config: Record<string, unknown>) => {
        const result = schema.safeParse(config);
        if (!result.success) {
          // If validation fails, throw an error with the validation issues
          throw new Error(
            `Configuration validation failed: ${JSON.stringify(result.error.errors)}`,
          );
        }
        return config;
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(' database.host'),
        port: configService.get('database.port'), // Convert string to number
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.databaseName'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'), // Set this to false in production
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
