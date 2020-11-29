import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { OAuth2Client } from 'google-auth-library';
import { WhitelistsService } from 'src/whitelists/whitelists.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

interface Payload {
  email?: string;
  email_verified?: boolean;
  exp?: number;
  given_name?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  locale?: 'pl' | string;
  picture?: string;
  sub?: string;
}

export interface VerifyTokenResponse {
  isVerified: boolean;
  payload: Payload | null;
}

@Injectable()
export class OAuthService {
  constructor(private readonly whitelistsService: WhitelistsService) {}

  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    try {
      const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_ID,
      });
      const payload = ticket.getPayload();
      const isWhitelisted: boolean = await this.whitelistsService.isWhitelisted(payload.sub);
      const currentDate = Date.now() * 1000;

      if (currentDate < payload.exp) {
        throw new Error('Access token expired');
      }

      delete payload.sub;
      delete payload.at_hash;
      delete payload.aud;
      delete payload.azp;
      delete payload.family_name;
      delete payload.name;
      delete payload.iat;
      delete payload.exp;
      // @ts-ignore
      delete payload.jti;
      delete payload.iss;
      delete payload.email_verified;

      return { isVerified: isWhitelisted, payload };
    } catch (error) {
      return { isVerified: false, payload: null };
    }
  }
}
