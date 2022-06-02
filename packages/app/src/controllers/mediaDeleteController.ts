import {
  Request, Response,
} from 'express';
import { Media } from '../db';

export async function mediaDeleteController(req: Request, res: Response): Promise<void> {
  try {
    const result = await Media.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
