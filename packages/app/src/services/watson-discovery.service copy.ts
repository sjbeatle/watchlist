// import axios from 'axios';
// import {
//   IWatsonDiscoveryConfig,
//   IWatsonDiscoveryResponse,
//   IWatsonDiscoveryClientResponse,
//   IWatsonDiscoveryResult,
//   IWatsonDiscoveryClientResult,
// } from '../interfaces';
// import { encodeBase64 } from '../utilities';

// export class WatsonDiscoveryService {
//   static Count = 100;
//   static PerPage = 10;
//   static TextMaxLength = 195;

//   private wdConfig: IWatsonDiscoveryConfig = {
//     key: process.env.WD_KEY,
//     collections: process.env.WD_COLLECTIONS,
//     environments: process.env.WD_ENVIRONMENTS,
//     url: process.env.WD_URL,
//   }

//   private endpoint = `${this.wdConfig.url}/v1/environments/${this.wdConfig.environments}/collections/${this.wdConfig.collections}`;

//   async naturalLanguageQuery(
//     query: string,
//     page = 1,
//     sendToLast = 0,
//   ): Promise<IWatsonDiscoveryClientResponse> {
//     try {
//       const response: {
//         data: IWatsonDiscoveryResponse,
//       } = await axios.get(
//         `${this.endpoint}/query`,
//         {
//           headers: { Authorization: `Basic ${encodeBase64(`apiKey:${this.wdConfig.key}`)}` },
//           params: {
//             count: WatsonDiscoveryService.Count,
//             deduplicate: false,
//             highlight: true,
//             natural_language_query: query,
//             passages: false,
//             return: 'text,metadata',
//             version: '2019-04-30',
//             offset: this.calculateOffset(page),
//           },
//         },
//       );

//       const resultsCount = response?.data?.matching_results || 0;

//       /* Page is too high GUARD
//       -----------------------------------------------*/
//       const maxPage = Math.ceil(resultsCount / WatsonDiscoveryService.PerPage);
//       if (page > maxPage) {
//         return this.naturalLanguageQuery(query, maxPage, maxPage);
//       }

//       /* Page is allowable, continue
//       -----------------------------------------------*/
//       const resultsBatch = this.getBatch(page);
//       // filter out results missing `documentUri`
//       const resultsWithUri = this.filterOutMissingDocumentUri(response?.data?.results || []);
//       // filter out results missing `confidence`
//       // STEVEN: We actually don't want to do this anymore because WD has no `confidence` score after
//       // the first 100 results...
//       // const resultsWithConfidence = this.filterOutMissingConfidence(resultsWithUri);
//       // sort the results
//       const sortResults = this.sort(resultsWithUri);
//       // map the results for response to client
//       const results = this.mapForClient(sortResults);

//       return {
//         results,
//         resultsBatch,
//         resultsCount,
//         sendToLast,
//       };
//     } catch (er) {
//       throw new Error(er);
//     }
//   }

//   private filterOutMissingDocumentUri(results: IWatsonDiscoveryResult[]): IWatsonDiscoveryResult[] {
//     return results.filter(r => r.metadata?.documentUri);
//   }

//   private filterOutMissingConfidence(results: IWatsonDiscoveryResult[]): IWatsonDiscoveryResult[] {
//     return results.filter(r => r.result_metadata?.confidence);
//   }

//   private sort(results: IWatsonDiscoveryResult[] = []): IWatsonDiscoveryResult[] {
//     return results
//       .sort((a, b) => {
//         const aConfidence = a.result_metadata?.confidence || 0;
//         const bConfidence = b.result_metadata?.confidence || 0;

//         /* Secondary sort by `score`
//         -----------------------------------------------*/
//         if (aConfidence === bConfidence) {
//           // handle missing scores for resiliency
//           const aScore = a.result_metadata?.score || 0;
//           const bScore = b.result_metadata?.score || 0;

//           return aScore === bScore
//             ? 0
//             : aScore > bScore
//               ? -1
//               : 1;
//         }

//         /* Primary sort by `confidence`
//         -----------------------------------------------*/
//         return aConfidence > bConfidence ? -1 : 1;
//       });
//   }

//   private calculateOffset(page: number): number {
//     const index = this.getBatch(page) - 1; // start at zero
//     return index * WatsonDiscoveryService.Count;
//   }

//   private getBatch(page: number): number {
//     const denominator = WatsonDiscoveryService.Count / WatsonDiscoveryService.PerPage;
//     return Math.ceil(page / denominator);
//   }

//   private mapForClient(results: IWatsonDiscoveryResult[] = []): IWatsonDiscoveryClientResult[] {
//     const clientResults = results.map((r) => {
//       const {
//         documentUri,
//         title,
//         date,
//       } = r.metadata;
//       const text = this.prepareText(r.highlight?.text || []);

//       return {
//         date,
//         documentUri,
//         text,
//         title,
//       };
//     });
//     return clientResults;
//   }

//   private prepareText(textArray: string[]): string {
//     /* Handle empty array
//     -----------------------------------------------*/
//     if (!textArray.length) {
//       return '';
//     }

//     let text = textArray[0];

//     /* Hanlde text too long (keep track)
//     -----------------------------------------------*/
//     const isGreaterThanAllowed = text.length >= WatsonDiscoveryService.TextMaxLength;
//     if (isGreaterThanAllowed) {
//       text = textArray[0].substring(0, WatsonDiscoveryService.TextMaxLength).trim();
//     }

//     /* Handle potential truncating text inbetween <em>..</em>
//     ------------------------------------------------------------*/
//     const startTagCount = text.match(/<em>/g)?.length || 0;
//     const endTagCount = text.match(/<\/em>/g)?.length || 0;

//     if (startTagCount > endTagCount) {
//       const checks = [
//         {
//           str: text.substring(text.length - 1),
//           test: '<',
//           append: '/em>',
//         },
//         {
//           str: text.substring(text.length - 2),
//           test: '</',
//           append: 'em>',
//         },
//         {
//           str: text.substring(text.length - 3),
//           test: '</e',
//           append: 'm>',
//         },
//         {
//           str: text.substring(text.length - 4),
//           test: '</em',
//           append: '>',
//         },
//       ];

//       let hasPartialTag = false;
//       checks.some((c) => {
//         if (c.str === c.test) {
//           text += c.append;
//           hasPartialTag = true;
//           return true;
//         }
//       });

//       if (!hasPartialTag) {
//         text += '</em>';
//       }
//     }

//     /* Handle excessive trailing periods
//     -----------------------------------------*/
//     text = text.replace(/(\.*)?(<\/em>)?\.*$/, '$2');

//     return `${text}${isGreaterThanAllowed ? '...' : '.'}`;
//   }
// }
