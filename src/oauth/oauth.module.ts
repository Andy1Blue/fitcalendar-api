import { Module } from '@nestjs/common';
import { WhitelistsModule } from 'src/whitelists/whitelists.module';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';

@Module({
  imports: [WhitelistsModule],
  controllers: [OAuthController],
  providers: [OAuthService],
  exports: [OAuthService],
})
export class OAuthModule {}
