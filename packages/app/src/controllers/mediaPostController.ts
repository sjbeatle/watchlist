import {
  Request, Response,
} from 'express';
import { Media } from '../db';

export async function mediaPostController(req: Request, res: Response): Promise<void> {
  try {
    const media = new Media({ ...req.body });
    const result = await media.save();
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
