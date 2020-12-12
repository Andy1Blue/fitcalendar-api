import { Controller, Get, Param } from '@nestjs/common';
import { WhitelistsService } from './whitelists.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Controller('whitelists')
export class WhitelistsController {
  constructor(private readonly whitelistsService: WhitelistsService) {}

  @Get('/user/:email')
  async checkIsWhitelisted(@Param('email') email: string) {
    const isWhitelisted = await this.whitelistsService.isWhitelisted(email);

    return isWhitelisted;
  }
}
