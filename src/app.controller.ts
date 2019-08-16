import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): {shortedenUrl: string} {
    return {shortedenUrl: 'https://linkedin.com/in/navruzjn/'};
  }
}
