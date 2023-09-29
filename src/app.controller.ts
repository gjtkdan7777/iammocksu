import { Controller, Request, Get, Post, UseGuards, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    Logger.log('Hello')
    return this.appService.getHello();
  }
}
