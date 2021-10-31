import { Injectable } from '@nestjs/common';
import { ITraining } from 'src/trainings/interfaces/training.interface';
import { TrainingsService } from 'src/trainings/trainings.service';
import { parseData } from './helpers/parse-data';

@Injectable()
export class ReportService {
  constructor(private trainingsService: TrainingsService) {}

  async generateCsvContentForUser(userEmail: string) {
    const trainings = await this.trainingsService.getTrainingsForUser({
      user_email: userEmail,
    });

    type TrainingField = keyof ITraining;

    const mappedDataField: { header: string; field: TrainingField }[] = [
      // { header: 'Created date', field: 'created_date' },
      // { header: 'Update date', field: 'update_date' },
      // { header: 'Tag color', field: 'tag_color' },
      { header: 'Source', field: 'source' },
      { header: 'Email', field: 'user_email' },
      { header: 'Date (start)', field: 'start_time' },
      { header: 'Date (end)', field: 'end_time' },
      { header: 'Sport', field: 'sport' },
      { header: 'Description', field: 'description' },
      { header: 'Duration (sec)', field: 'duration_sec' },
      { header: 'Calories (kcal)', field: 'calories_kcal' },
      { header: 'Distance (km)', field: 'distance_km' },
      { header: 'Max heart rate (bpm)', field: 'heart_rate_avg_bpm' },
      { header: 'Average heart rate (bpm)', field: 'heart_rate_avg_bpm' },
      { header: 'Max speed (kmh)', field: 'speed_max_kmh' },
      { header: 'Average speed (kmh)', field: 'speed_avg_kmh' },
      { header: 'Elevation max (m)', field: 'elevation_max_m' },
      { header: 'Elevation min (m)', field: 'elevation_min_m' },
      { header: 'Elevation gain (m)', field: 'elevation_gain_m' },
      { header: 'Training effect aerobic', field: 'training_effect_aerobic' },
      { header: 'Training effect anaerobic', field: 'training_effect_anaerobic' },
      { header: 'VO2max', field: 'vo2max' },
      { header: 'Max pace (min/km)', field: 'pace_max_min_km' },
      { header: 'Average pace (min/km)', field: 'pace_avg_min_km' },
      { header: 'Max cadence (spm)', field: 'cadence_max_spm' },
      { header: 'Average cadence (spm)', field: 'cadence_avg_spm' },
      { header: 'Points', field: 'points' },
      { header: 'Effort', field: 'effort' },
      { header: 'Feeling', field: 'feeling' },
      { header: 'Steps', field: 'steps' },
      { header: 'Hydration (ml)', field: 'hydration_ml' },
    ];

    const csv = [];
    const header = [];
    const delimiter = ',';

    trainings.forEach((training) => {
      mappedDataField.forEach(({ field }, index) => {
        csv.push(`${parseData(training[field as string])}${delimiter}`);

        if (index < mappedDataField.length) {
          header.push(`${parseData(mappedDataField[index].header)}${delimiter}`);
        }
      });

      csv.push('\n');
    });

    csv.unshift(...new Set(header), '\n');
    console.log(csv.join(' '));
    return csv.join(' ');
  }
}
