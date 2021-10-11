import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhitelistSchema } from '../whitelists/schemas/whitelist.schema';
import { OAuthService } from '../oauth/oauth.service';
import { WhitelistsService } from '../whitelists/whitelists.service';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { LogSchema } from './schemas/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Log', schema: LogSchema },
      { name: 'Whitelist', schema: WhitelistSchema },
    ]),
  ],
  controllers: [LogsController],
  providers: [LogsService, WhitelistsService, OAuthService],
})
export class LogsModule {}
