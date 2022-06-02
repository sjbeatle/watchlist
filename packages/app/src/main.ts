/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { DBConnect } from './db';
import {
  AppRouter,
  HealthRouter,
} from './controllers';
// AuthRouter,

// import {
//   ensureAuthenticatedMiddleware,
//   initializePassport,
//   configureSessionMiddleware,
// } from './middleware';
// import path from 'path';
import { isDev } from './utilities';
import { mediaGetAllController } from './controllers/mediaGetAllController';
import { mediaPostController } from './controllers/mediaPostController';
import { mediaDeleteController } from './controllers/mediaDeleteController';
import { mediaPutController } from './controllers/mediaPutController';

if (isDev) {
  dotenv.config({ path: './.env' });
}

DBConnect();

const port = process.env.SERVER_PORT || 3000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Health routes
-----------------------------------------------*/
app.use(new HealthRouter().makeRouter());

/* Handle favicon.ico (avoid OIDC race condition)
-----------------------------------------------*/
// app.get(
//   '/favicon.ico',
//   (_req: express.Request, res: express.Response) => {
//     res.status(200);
//     res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
//   },
// );

/* Session
-----------------------------------------------*/
// configureSessionMiddleware(app);

/* Authentication
-----------------------------------------------*/
// initializePassport(app);
// app.use(new AuthRouter().makeRouter());
// // add forced-auth middleware
// app.use(ensureAuthenticatedMiddleware);

/* API routes
-----------------------------------------------*/
// app.use(new ProfileRouter().makeRouter());

/* App routes
-----------------------------------------------*/
app.use(new AppRouter().makeRouter());
app.get('/v1/media', mediaGetAllController);
app.post('/v1/media', mediaPostController);
app.delete('/v1/media/:id', mediaDeleteController);
app.put('/v1/media/:id', mediaPutController);

/* Start the Server
-----------------------------------------------*/
/* tslint:disable:no-var-requires no-console */
if (isDev) { // development
  const https = require('https');
  const selfSigned = require('openssl-self-signed-certificate');
  const {
    key,
    cert,
  } = selfSigned;

  https
    .createServer(
      {
        key,
        cert,
      },
      app,
    )
    .listen(port);
  console.log(`HTTPS started at https://localhost:${port}`);
} else {
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}

