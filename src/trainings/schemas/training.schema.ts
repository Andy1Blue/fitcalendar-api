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
  hydration_ml: number;
}
