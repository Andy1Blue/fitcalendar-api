import { Module } from '@nestjs/common';
import { OAuthModule } from 'src/oauth/oauth.module';
import { TrainingsModule } from 'src/trainings/trainings.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [TrainingsModule, OAuthModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
