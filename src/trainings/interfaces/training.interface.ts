export interface Location {
  latitude: number;
  longitude: number;
}

export interface Points {
  distance_km?: number;
  speed_kmh?: number;
  heart_rate_bpm?: number;
  timestamp: Date;
  location?: Location[];
  altitude?: number;
}

export const enum Source {
  Manual = 'Manual',
}

export const enum Sport {
  Spinning = 'Spinning',
  ExerciseBike = 'Exercise Bike',
  Tabata = 'Tabata',
  Run = 'Run',
  Bike = 'Bike',
  Walk = 'Walk',
  Hiking = 'Hiking',
  Soccer = 'Soccer',
  Basketball = 'Basketball',
  Tennis = 'Tennis',
  Golf = 'Golf',
  Volleyball = 'Volleyball',
  Badminton = 'Badminton',
  Swimming = 'Swimming',
  Table_Tennis = 'Table Tennis',
  Skiing = 'Skiing',
  Roller_Skating = 'Roller Skating',
  Other = 'Other',
}

export interface ITraining {
  id?: string;
  user_email: string;
  sport?: Sport;
  created_date?: string; // format 0000-00-00 00:00:00
  update_date?: string;
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
