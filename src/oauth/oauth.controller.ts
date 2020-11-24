import { Controller, Get, Param, BadRequestException, Body, Post } from '@nestjs/common';
import { WhitelistsService } from 'src/whitelists/whitelists.service';
import { OAuthService } from './oauth.service';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

@Controller('oauth')
export class OAuthController {
  constructor(
    private readonly oauthService: OAuthService,
    private readonly whitelistsService: WhitelistsService,
  ) {}

  @Post()
  async verifyToken(@Body('token') token: string, @Body('userId') userId: string) {
    const currentDate = Date.now() * 1000;
    const payload = await this.oauthService.verifyToken(token, userId);
    const isWhitelisted = await this.whitelistsService.isWhitelisted(userId);

    if (!payload || !isWhitelisted) {
      throw new BadRequestException('No authorisation');
    }

    if (currentDate < payload?.payload?.exp) {
      throw new BadRequestException('Access token expired');
    }

    return payload;
  }
}
