import { Module } from '@nestjs/common';

import { CallerService } from 'src/caller/caller.service';
import { CallerController } from 'src/caller/caller.controller';

@Module({
  imports: [],
  controllers: [CallerController],
  providers: [CallerService],
})
export class CallerModule {}
