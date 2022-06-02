// import {
//   Request,
//   Response,
//   Router,
// } from 'express';
// import { WatsonDiscoveryService } from '../services';
// import { IWatsonDiscoveryQueryParams } from '../interfaces';

// export class WatsonDiscoveryRouter {
//   static Root = '/ocean/search/api/v1';

//   makeRouter(): Router {
//     const router: Router = Router();

//     router.get(
//       `${WatsonDiscoveryRouter.Root}/watson-discovery`,
//       async (req: Request, res: Response) => {
//         const {
//           query, page,
//         } = (req.query as unknown) as IWatsonDiscoveryQueryParams;

//         try {
//           const wdService = new WatsonDiscoveryService();
//           const response = await wdService.naturalLanguageQuery(
//             query,
//             parseInt(page || '1'),
//           );
//           res.status(200);
//           res.send(response);
//         } catch (er) {
//           res.status(500);
//           res.send(er);
//         }
//       },
//     );

//     return router;
//   }
// }
