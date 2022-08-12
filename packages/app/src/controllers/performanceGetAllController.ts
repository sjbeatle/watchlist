import {
  Request, Response,
} from 'express';
import { Performance } from '../db';

export async function performanceGetAllController(req: Request, res: Response): Promise<void> {
  try {
    const performance = await Performance.find().exec();
    res.send(performance || []);
  } catch (error) {
    res.status(500).send(error);
  }
}
