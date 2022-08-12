import {
  Schema,
  Model,
  model,
} from 'mongoose';
import { IPerformance } from '../interfaces';

export const PerformanceSchema: Schema = new Schema({
  venue: {
    type: String,
    required: true,
    unique: false,
  },
  date: {
    type: String,
    required: true,
    unique: false,
  },
  timeStart: {
    type: String,
    required: true,
    unique: false,
  },
  timeEnd: {
    type: String,
    required: true,
    unique: false,
  },
  notes: {
    type: String,
    required: false,
    unique: false,
  },
  revenue: {
    type: Number,
    required: true,
    unique: false,
  },
  coverCharge: {
    type: Number,
    required: false,
    unique: false,
  },
  isCanceled: {
    type: Boolean,
    required: false,
    unique: false,
  },
});

export const Performance: Model<IPerformance> = model<IPerformance>('Performance', PerformanceSchema);
