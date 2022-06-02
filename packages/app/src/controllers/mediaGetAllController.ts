import {
  Request, Response,
} from 'express';
import { Media } from '../db';

export async function mediaGetAllController(req: Request, res: Response): Promise<void> {
  try {
    const media = await Media.find().exec();
    res.send(media || []);
  } catch (error) {
    res.status(500).send(error);
  }
}
