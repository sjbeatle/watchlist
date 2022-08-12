import {
  Request, Response,
} from 'express';
import { Venue } from '../db';

export async function venueGetController(req: Request, res: Response): Promise<void> {
  try {
    const venue = await Venue.findById(req.params.id).exec();
    res.send(venue || {});
  } catch (error) {
    res.status(500).send(error);
  }
}
