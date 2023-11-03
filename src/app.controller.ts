import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getOnlineMessage(): string {
    return "coffee signature service is online!";
  }
}
