import * as mongoose from 'mongoose';
import { Points, Source, Sport } from '../interfaces/training.interface';

export const TrainingSchema = new mongoose.Schema({
  id: String,
  user_email: String,
  sport: String,
  created_date: String,
  update_date: String,
  tag_color: String,
  source: String,
  description: String,
  start_time: String,
  end_time: String,
  duration_sec: Number,
  duration_move_sec: Number,
  distance_km: Number,
  calories_kcal: Number,
  heart_rate_avg_bpm: Number,
  heart_rate_max_bpm: Number,
  speed_avg_kmh: Number,
  speed_max_kmh: Number,
  points: Object,
  effort: Number,
  feeling: Number,
  steps: Number,
  hydration_ml: Number,
  elevation_max_m: Number,
  elevation_min_m: Number,
  elevation_gain_m: Number,
  training_effect_aerobic: Number,
  training_effect_anaerobic: Number,
  vo2max: Number,
  pace_max_min_km: Number,
  pace_avg_min_km: Number,
  cadence_max_spm: Number,
  cadence_avg_spm: Number,
});

export interface Training extends mongoose.Document {
  id: string;
  user_email: string;
  sport: Sport;
  created_date: string;
  update_date: string;
  tag_color?: string;
  source?: Source;
  description?: string;
  start_time?: string;
  end_time?: string;
  duration_sec?: number;
  duration_move_sec?: number;
  distance_km?: number;
  calories_kcal?: number;
  heart_rate_avg_bpm?: number;
  heart_rate_max_bpm?: number;
  speed_avg_kmh?: number;
  speed_max_kmh?: number;
  points?: Points[];
  effort?: number;
  feeling?: number;
  steps?: number;
  hydration_ml?: number;
  elevation_max_m?: number;
  elevation_min_m?: number;
  elevation_gain_m?: number;
  training_effect_aerobic?: number;
  training_effect_anaerobic?: number;
  vo2max?: number;
  pace_max_min_km?: number;
  pace_avg_min_km?: number;
  cadence_max_spm?: number;
  cadence_avg_spm?: number;
}
