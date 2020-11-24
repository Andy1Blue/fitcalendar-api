import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingsModule } from './trainings/trainings.module';
import { LogsModule } from './userLogs/logs.module';
import { WhitelistsModule } from './whitelists/whitelists.module';
import { OAuthModule } from './oauth/oauth.module';

const dbData =
  process.env.MONGOOSE_USER === null || process.env.MONGOOSE_USER === ''
    ? process.env.MONGOOSE_HOST
    : 'mongodb+srv://' +
      process.env.MONGOOSE_USER +
      ':' +
      process.env.MONGOOSE_PASSWORD +
      '@' +
      process.env.MONGOOSE_HOST +
      '?retryWrites=true&w=majority';

@Module({
  imports: [
    TrainingsModule,
    LogsModule,
    WhitelistsModule,
    OAuthModule,
    MongooseModule.forRoot(dbData, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class AppModule {}
