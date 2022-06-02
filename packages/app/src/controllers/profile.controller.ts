import {
  Request,
  Response,
  Router,
} from 'express';

export class ProfileRouter {
  static Root = '/ocean/search/api/v1';

  makeRouter(): Router {
    const router: Router = Router();

    router.get(
      `${ProfileRouter.Root}/profile`,
      async (req: Request, res: Response) => {
        try {
          // @ts-ignore Passport extends session
          const user = req.session?.passport?.user?._json || {};
          const {
            emailAddress,
            firstName,
            lastName,
            uid,
          } = user;

          res.status(200);
          res.send({
            emailAddress,
            firstName,
            lastName,
            uid,
          });
        } catch (er) {
          res.status(500);
          res.send(er);
        }
      },
    );

    return router;
  }
}
