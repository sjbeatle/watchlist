import * as express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import * as redis from 'redis';
import {
  decodeBase64,
  isDev,
} from '../utilities';

export function configureSessionMiddleware(app: express.Express): void {
  const defaultSessionConfig = {
    name: 'w3-search-kyndryl.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 7200 * 1000, // set to match OIDC token configuration
    },
  };

  /* Dev, just use memory
  -----------------------------------------------*/
  if (isDev) { // development
    app.use(session(defaultSessionConfig));

  /* Production & Stage, connect to Redis
  -----------------------------------------------*/
  } else {
    const sessionStore = connectRedis(session);
    const connectionString = process.env.REDIS_URL;
    const redisInstance = redis.createClient(connectionString, { tls: {
      servername: new URL(connectionString).hostname,
      ca: decodeBase64(process.env.REDIS_CERTIFICATE_BASE64),
    } });

    const options: connectRedis.RedisStoreOptions = { client: redisInstance };

    app.set('trust proxy', 1);
    app.use(session({
      ...defaultSessionConfig,
      store: new sessionStore(options),
    }));
  }
}
