import { Express } from 'express';
import passport from 'passport';
// @ts-ignore: no declaration file exists for this module
import { IDaaSOIDCStrategy } from 'passport-ci-oidc';

export function initializePassport(app: Express): void {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  const strategy = new IDaaSOIDCStrategy(
    {
      discoveryURL: process.env.DISCOVERY_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      response_type: 'code',
      scope: 'openid',
      skipUserProfile: true,
    },
    (
      _iss: never,
      _sub: never,
      profile: { [key: string]: string },
      accessToken: string,
      _refreshToken: string,
      _params: unknown,
      done: (a: null, b: { [key: string]: string }) => void,
    ) => {
      // console.log('profile:', profile);
      process.nextTick(() => {
        profile.accessToken = accessToken;
        done(null, profile);
      });
    },
  );

  passport.use(strategy);
}
