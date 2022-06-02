import axios from 'axios';
import { IMDB8Response } from '../interfaces';

export class OMDBService {
  private endpoint = 'https://imdb8.p.rapidapi.com/title/';

  async getById(query: string): Promise<IMDB8Response[]> {
    try {
      const response: {
        data: IMDB8Response,
      } = await axios.get(
        `${this.endpoint}get-details`,
        {
          headers: {
            'x-rapidapi-host': 'imdb8.p.rapidapi.com',
            'x-rapidapi-key': 'badaa6ed62msh34a71ab1e511db2p12c28ejsn307fc27a4783',
          },
          params: { tconst: query },
        },
      );

      return [ response.data ];
    } catch (er) {
      console.log('>> TESTING >> er', er);
      throw new Error(er);
    }
  }

  async query(query: string): Promise<IMDB8Response[]> {
    try {
      const response: {
        data: {
          results: IMDB8Response[],
        },
      } = await axios.get(
        `${this.endpoint}find`,
        {
          headers: {
            'x-rapidapi-host': 'imdb8.p.rapidapi.com',
            'x-rapidapi-key': 'badaa6ed62msh34a71ab1e511db2p12c28ejsn307fc27a4783',
          },
          params: { q: query },
        },
      );

      return response.data.results;
    } catch (er) {
      console.log('>> TESTING >> er', er);
      throw new Error(er);
    }
  }
}
