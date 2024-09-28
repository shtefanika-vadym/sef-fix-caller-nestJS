import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';
import { CallerService } from 'src/caller/caller.service';
import { CallerController } from 'src/caller/caller.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, CallerController],
  providers: [AppService, CallerService],
})
export class AppModule {}
