import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
  @Get('/asdf')
  getRootRoute() {
    return 'Hello!';
  }

  @Get('bye')
  getByeThere() {
    return 'bye there!';
  }
}
