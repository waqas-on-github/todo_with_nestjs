import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptions } from './metaOptions.entity';
import { MetaOptionsService } from './providers/metaOptions.service';

@Module({
  controllers: [MetaOptionsController],
  imports: [TypeOrmModule.forFeature([MetaOptions])],
  providers: [MetaOptionsService],
})
export class MetaOptionsModule {}
