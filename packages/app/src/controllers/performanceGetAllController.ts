import {
  Request, Response,
} from 'express';
import { Performance } from '../db';

export async function performanceGetAllController(req: Request, res: Response): Promise<void> {
  try {
    const now = new Date().toISOString().split('T')[0];
    // @ts-ignore don't know why... this should work!
    const performance = await Performance.find({ date: { $gte: now } }).exec();
    res.send(performance || []);
  } catch (error) {
    res.status(500).send(error);
  }
}
