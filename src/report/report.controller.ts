import { Controller, Post, Headers, Body, BadRequestException } from '@nestjs/common';
import { OAuthService } from 'src/oauth/oauth.service';
import { IHeader } from 'src/trainings/interfaces/header.interface';
import { ReportService } from './report.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly oauthService: OAuthService,
  ) {}

  @Post('/generate-csv')
  async generateCsv(@Headers() headers: IHeader) {
    const response = await this.oauthService.verifyToken(headers.token);

    if (response.isVerified) {
      return this.reportService.generateCsvContentForUser(response.payload.email);
    } else {
      throw new BadRequestException('No authorization');
    }
  }
}
