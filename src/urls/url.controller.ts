import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async addUrl(
    @Body('originalUrl') originalUrl: string,
  ) {
    const generatedUrl = await this.urlService.insertUrl(originalUrl);
    return { url: generatedUrl };
  }

  @Get()
  async getAllUrl() {
    return await this.urlService.getUrls();
  }

  @Get(':shortenedUrl')
  async getUrl(@Param('shortenedUrl') shortenedUrl: string) {
    return await this.urlService.getSingleUrl(shortenedUrl);
  }

  @Patch(':shortenedUrl')
  async updateUrl(
    @Param('shortenedUrl') shortenedUrl: string,
    @Body('originalUrl') originalUrl: string,
  ) {
    await this.urlService.updateUrl(shortenedUrl, originalUrl);
    return null;
  }

  @Delete(':id')
  async removeUrl(@Param('shortenedUrl') shortenedUrl: string) {
    await this.urlService.deleteUrl(shortenedUrl);
    return null;
  }
}
