import { Module } from '@nestjs/common';

import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { RedisModule } from '../redis/redis.module';

@Module({
    imports: [RedisModule.register({
        name: 'testTask',
        url: 'redis://localhost:6379',
    })],
    controllers: [UrlController],
    providers: [UrlService],
})
export class UrlModule {}
