import {
  Request, Response,
} from 'express';
import { Venue } from '../db';

export async function venuePostController(req: Request, res: Response): Promise<void> {
  const {
    name,
    phone,
    email,
    website,
    addressLineOne,
    addressLineTwo,
    city,
    state,
    zip,
  } = req.body;

  try {
    const venue = new Venue({
      name,
      phone,
      email,
      website,
      addressLineOne,
      addressLineTwo,
      city,
      state,
      zip,
    });
    const result = await venue.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * EXAMPLE
 */
// fetch('http://localhost:5000/covers/5ef3ba42688aad4a8ac9d0fc', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({artist: 'legend'}),
// });
