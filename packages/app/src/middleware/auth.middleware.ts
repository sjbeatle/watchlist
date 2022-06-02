import {
  Request,
  Response,
  NextFunction,
} from 'express';

declare module 'express-session' {
  interface SessionData {
    originalUrl: string;
  }
}

export function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.isAuthenticated()) {
    const isXhr = req.xhr || (req.headers?.accept?.indexOf('json') > -1);

    if (isXhr) {
      res.redirect(401, '/ocean/search/auth');
    } else {
      if (req.session === null) {
        throw new Error('unexpected request session is null, is the session manager broken?');
      }

      // store the URL so we come back where we started
      req.session.originalUrl = req.originalUrl;
      res.redirect('/ocean/search/auth');
    }
  } else {
    return next();
  }
}
