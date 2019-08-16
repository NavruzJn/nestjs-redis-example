import * as Redis from 'ioredis';
import * as uuid from 'uuid';

import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './redis.constants';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.interface';

export class RedisClientError extends Error {}
export interface RedisUrl {
  defaultKey: string;
  urls: Map<string, Redis.Redis>;
  size: number;
}

export const createUrl = () => ({
  provide: REDIS_CLIENT,
  useFactory: (options: RedisModuleOptions | RedisModuleOptions[]) => {
    const urls = new Map<string, Redis.Redis>();
    const defaultKey = uuid();
    if (Array.isArray(options)) {
      for (const o of options) {
        if (o.name) {
          if (urls.has(o.name)) {
            throw new RedisClientError(`url ${o.name} is exists`);
          }
          if (o.url) {
            urls.set(o.name, new Redis(o.url));
          } else {
            urls.set(o.name, new Redis(o));
          }
        } else {
          if (urls.has(defaultKey)) {
            throw new RedisClientError('default url is exists');
          }
          if (o.url) {
            urls.set(defaultKey, new Redis(o.url));
          } else {
            urls.set(defaultKey, new Redis(o));
          }
        }
      }
    } else {
      if (options.url) {
        urls.set(defaultKey, new Redis(options.url));
      } else {
        urls.set(defaultKey, new Redis(options));
      }
    }
    return {
      defaultKey,
      urls,
      size: urls.size,
    };
  },
  inject: [REDIS_MODULE_OPTIONS],
});

export const createAsyncUrlOptions = (options: RedisModuleAsyncOptions) => ({
  provide: REDIS_MODULE_OPTIONS,
  useFactory: options.useFactory,
  inject: options.inject,
});
