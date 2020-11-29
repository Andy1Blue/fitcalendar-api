import { Controller, BadRequestException, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { OAuthService } from './oauth.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Post()
  async verifyToken(@Body('token') token: string) {
    const payload = await this.oauthService.verifyToken(token);

    if (!payload.isVerified) {
      throw new BadRequestException('No authentication');
    }

    return payload;
  }
}
