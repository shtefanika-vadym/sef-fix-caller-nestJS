import { Controller, Post, Query } from '@nestjs/common';

import { CallerService } from 'src/caller/caller.service';

@Controller('caller')
export class CallerController {
  constructor(private readonly callerService: CallerService) {}

  @Post()
  call(@Query('redirectCallTo') redirectCallTo: string) {
    return this.callerService.call(redirectCallTo);
  }

  @Post('/handle-interaction')
  handleInteraction(@Query('redirectCallTo') redirectCallTo: string) {
    return this.callerService.handleInteraction(redirectCallTo);
  }
}
