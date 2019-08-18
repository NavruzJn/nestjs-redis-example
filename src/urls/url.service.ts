import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

import { UrlModel } from './url.model';

@Injectable()
export class UrlService {
  private urls: UrlModel[] = [];

  constructor(private readonly redisService: RedisService) {}

  async insertUrl(originalUrl: string) {
    const shortenedUrl = Math.random().toString();
    await this.redisService.createUrl(shortenedUrl, originalUrl);
    return shortenedUrl;
  }

  async getUrls() {
    return await this.redisService.getUrls();
  }

  async getSingleUrl(shortenedUrl: string) {
    const originalUrl = await this.findUrl(shortenedUrl);
    return { ...originalUrl };
  }

  async updateUrl(shortenedUrl: string, originalUrl: string) {
    const url = this.findUrl(shortenedUrl);
    if (url) {
      return await this.redisService.updateUrl(shortenedUrl, originalUrl);
    }
  }

  async deleteUrl(shortenedUrl: string) {
    const url = this.findUrl(shortenedUrl);
    if (url) {
      return await this.redisService.deleteUrl(shortenedUrl);
    }
  }

  private async findUrl(shortenedUrl: string) {
    const url = await this.redisService.getUrl(shortenedUrl);
    if (!url) {
      throw new NotFoundException('Could not find url.');
    }
    return url;
  }
}
