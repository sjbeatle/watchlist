import {
  Request, Response,
} from 'express';
import {
  Performance, Venue,
} from '../db';

export async function performancePostController(req: Request, res: Response): Promise<void> {
  let { venue } = req.body;
  const {
    date,
    timeStart,
    timeEnd,
    notes,
    revenue,
    coverCharge,
    isCanceled,
  } = req.body;

  if (typeof venue === 'object') {
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
    } = venue;

    try {
      const newVenue = new Venue({
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
      const venueRes = await newVenue.save();

      venue = venueRes._id;
    } catch (error) {
      res.status(500).send(error);
    }
  }

  try {
    const performance = new Performance({
      venue,
      date,
      timeStart,
      timeEnd,
      notes,
      revenue,
      coverCharge,
      isCanceled: !!isCanceled,
    });
    const result = await performance.save();
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
