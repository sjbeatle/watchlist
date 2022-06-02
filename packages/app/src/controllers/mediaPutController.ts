import {
  Request, Response,
} from 'express';
import { Media } from '../db';

export async function mediaPutController(req: Request, res: Response): Promise<void> {
  try {
    const result = await Media.findByIdAndUpdate(req.params.id, { ...req.body }).exec();
    res.send(result);
  } catch (error) {
    console.log('>> TESTING >> error', error);
    res.status(500).send(error);
  }
}

/**
 * EXAMPLE
 */
// fetch('http://localhost:5000/covers/5ef3ba42688aad4a8ac9d0fc', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({song: 'legend'}),
// });
