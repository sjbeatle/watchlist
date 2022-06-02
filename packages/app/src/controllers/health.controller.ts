import {
  Request,
  Response,
  Router,
} from 'express';

export class HealthRouter {
  static Root = '/health/ping';

  makeRouter(): Router {
    const router: Router = Router();

    router.get(HealthRouter.Root, (req: Request, res: Response) => {
      res.send({
        health: 'ok',
        timestamp: new Date(),
        headers: req.headers,
      });
    });

    return router;
  }
}
