import {
  Schema,
  Model,
  model,
} from 'mongoose';
import { IMedia } from '../interfaces';

export const MediaSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imdbId: { type: String },
  poster: { type: String },
  status: { type: Number },
  service: { type: Number },
  premiere: { type: Date },
  type: { type: Number },
});

export const Media: Model<IMedia> = model<IMedia>('watchlist', MediaSchema);
