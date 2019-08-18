
import { Injectable, Inject } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constants';
import * as Redis from 'ioredis';
import { RedisUrl, RedisClientError } from './redis.provider';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisUrl: RedisUrl,
  ) { }

  getUrl(shortenedUrl?: string): Redis.Redis {
    if (!shortenedUrl) {
      shortenedUrl = this.redisUrl.defaultKey;
    }
    if (!this.redisUrl.urls.has(shortenedUrl)) {
      throw new RedisClientError(`url ${shortenedUrl} is not exists`);
    }
    return this.redisUrl.urls.get(shortenedUrl);
  }

  getUrls(): Map<string, Redis.Redis> {
    return this.redisUrl.urls;
  }

  createUrl(shortenedUrl?: string, originalUrl?: string): Redis.Redis {
    return this.redisUrl.urls.set(shortenedUrl, originalUrl);
  }

  updateUrl(shortenedUrl?: string, originalUrl?: string): Redis.Redis {
    return this.redisUrl.urls.set(shortenedUrl, originalUrl);
  }

  deleteUrl(shortenedUrl?: string): Redis.Redis {
    return this.redisUrl.urls.delete(shortenedUrl);
  }
}
