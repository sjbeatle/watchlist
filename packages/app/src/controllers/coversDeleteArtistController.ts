import {
  Request, Response,
} from 'express';
import { Covers } from '../db';

export async function CoversDeleteArtistController(req: Request, res: Response): Promise<void> {
  try {
    const result = await Covers.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
