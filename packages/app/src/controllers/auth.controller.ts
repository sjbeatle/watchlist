import passport from 'passport';
import {
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';

export class AuthRouter {
  static Root = '/auth';

  makeRouter(): Router {
    const router: Router = Router();

    /* Auth endpoint
    -----------------------------------------------*/
    router.get(AuthRouter.Root, passport.authenticate('openidconnect'));

    /* Callback
    -----------------------------------------------*/
    router.get(
      `${AuthRouter.Root}/callback`,
      (req: Request, res: Response, next: NextFunction): void => {
        try {
          if (req.session === null) {
            throw new Error('unexpected request session is null, is the session manager broken?');
          }

          if (typeof req.query?.error_description === 'string') {
            throw new Error(req.query.error_description);
          }

          const successRedirect = req.session.originalUrl || '/';

          passport.authenticate('openidconnect', async (error, user) => {
            if (error) {
              return next('Unable to authenticate\n' + error);
            }

            if (!user) {
              return next('No User');
            }

            req.logIn(user, async loginErr => {
              if (loginErr) {
                return next('Unable to logIn\n' + loginErr);
              }

              // successful login
              return res.redirect(successRedirect);
            });
          })(req, res, next);
        } catch (error) {
          return next('Auth callback error' + error);
        }
      },
    );

    return router;
  }
}
