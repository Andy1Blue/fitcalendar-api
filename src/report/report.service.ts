import { Injectable } from '@nestjs/common';
import { TrainingsService } from 'src/trainings/trainings.service';
import { parseData } from './helpers/parse-data';

@Injectable()
export class ReportService {
  constructor(private trainingsService: TrainingsService) {}

  async generateCsvContentForUser(userEmail: string) {
    const trainings = await this.trainingsService.getTrainingsForUser({
      user_email: userEmail,
    });

    const mappedDataField: { header: string; field: string }[] = [
      { header: 'Date', field: 'start_time' },
      { header: 'Sport', field: 'sport' },
      { header: 'Calories', field: 'calories_kcal' },
      { header: 'Description', field: 'description' },
    ];

    const csv = [];
    const header = [];
    const delimiter = ',';

    trainings.forEach((training) => {
      mappedDataField.forEach(({ field }) => {
        csv.push(`${parseData(training[field])}${delimiter}`);
      });

      csv.push('\n');
    });

    csv.unshift(...header, '\n');

    return csv.join(' ');
  }
}
