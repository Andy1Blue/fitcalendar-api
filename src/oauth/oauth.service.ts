import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

@Injectable()
export class OAuthService {
  constructor() {}

  async verifyToken(token: string, userId: string) {
    try {
      const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_ID);
      const ticket = await client.verifyIdToken({idToken: token, audience: process.env.REACT_APP_GOOGLE_ID});
      const payload = ticket.getPayload();

      return {isVerified: true, payload};
    } catch (error) {
      return {isVerified: false, payload: null};
    }

  }
}
