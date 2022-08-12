import {
  Schema,
  Model,
  model,
} from 'mongoose';
import { IVenue } from '../interfaces';

export const VenueSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  phone: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  website: {
    type: String,
    required: false,
    unique: false,
  },
  addressLineOne: {
    type: String,
    required: false,
    unique: false,
  },
  addressLineTwo: {
    type: String,
    required: false,
    unique: false,
  },
  city: {
    type: String,
    required: false,
    unique: false,
  },
  state: {
    type: String,
    required: false,
    unique: false,
  },
  zip: {
    type: String,
    required: false,
    unique: false,
  },
});

export const Venue: Model<IVenue> = model<IVenue>('venue', VenueSchema);
