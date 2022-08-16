import {
  Request, Response,
} from 'express';
import { Performance } from '../db';

export async function performancePutController(req: Request, res: Response): Promise<void> {
  try {
    const performance = await Performance.updateOne(
      { _id: req.params.id },
      ...req.body,
    );
    if (performance) {
      res.send(performance.modifiedCount);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
