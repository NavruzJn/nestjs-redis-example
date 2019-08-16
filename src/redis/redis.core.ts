import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.interface';
import {
  createAsyncUrlOptions,
  createUrl,
} from './redis.provider';

import { REDIS_MODULE_OPTIONS } from './redis.constants';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisCoreModule {
  static register(
    options: RedisModuleOptions | RedisModuleOptions[],
  ): DynamicModule {
    return {
      module: RedisCoreModule,
      providers: [
        createUrl(),
        { provide: REDIS_MODULE_OPTIONS, useValue: options },
      ],
      exports: [RedisService],
    };
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisCoreModule,
      imports: options.imports,
      providers: [createUrl(), createAsyncUrlOptions(options)],
      exports: [RedisService],
    };
  }
}
