import {
  Request,
  Response,
  Router,
} from 'express';
// import path from 'path';
import {
  IMDB8QueryParams, IMDB8Response,
} from '../interfaces';
import { OMDBService } from '../services';

export class AppRouter {
  static Root = '/v1';
  // static staticPath = path.join(__dirname, '..', 'ui');

  makeRouter(): Router {
    const router = Router();

    router.get(`${AppRouter.Root}/omdb`, async (req: Request, res: Response) => {
      // https://rapidapi.com/apidojo/api/imdb8/
      const {
        q, tconst,
      } = (req.query as unknown) as IMDB8QueryParams;
      console.log('>> TESTING >> tconst', tconst);

      try {
        const omdbService = new OMDBService();
        let response: IMDB8Response[];
        if (tconst) {
          response = await omdbService.getById(tconst);
        } else {
          response = await omdbService.query(q);
        }
        res.status(200);
        res.send(response);
      } catch (er) {
        res.status(500);
        res.send(er);
      }
    });

    return router;

    // /* Don't allow `/`
    // -----------------------------------------------*/
    // router.get('/', (_req: express.Request, res: express.Response) => {
    //   res.redirect(AppRouter.Root);
    // });

    // /* Handle static assets
    // -----------------------------------------------*/
    // router.use(express.static(AppRouter.staticPath));

    // /* App root
    // -----------------------------------------------*/
    // router.get(
    //   [
    //     AppRouter.Root,
    //     `${AppRouter.Root}/*`,
    //   ],
    //   (_req: express.Request, res: express.Response) => {
    //     res.sendFile(`${AppRouter.staticPath}${AppRouter.Root}/index.html`);
    //   },
    // );
  }
}
