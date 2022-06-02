import { Component, OnInit } from '@angular/core';
import { IMedia } from '../../../app/src/interfaces';

export const Prefixes = [
  'A',
  'AN',
  'THE',
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'watchlist';
  watchList: IMedia[] = [];

  ngOnInit() {
    this.getWatchlist();
  }

  async getWatchlist(): Promise<void> {
    const response = await fetch('https://mariasbasement.com/v1/media', {
      method: 'GET',
    });
    const json = await response.json();
    this.watchList = this.sort(json as IMedia[]);
  }

  get watching(): IMedia[] {
    return this.watchList.filter(a => a.status === 1);
  }

  get unwatched(): IMedia[] {
    // prioritize trailers
    return this.trailerPriority(this.premierePriority(this.watchList.filter(a => a.status === 0)));
  }

  get watched(): IMedia[] {
    return this.watchList.filter(a => a.status === 2);
  }

  private trailerPriority(list: IMedia[] = []): IMedia[] {
    return list
      .sort((a) => a.type === 5 ? -1 : 1);
  }

  private premierePriority(list: IMedia[] = []): IMedia[] {
    return list
      .sort((a, b) => {
        if (!a.premiere) {
          return 1;
        }

        const aPremiere = new Date(a.premiere);
        const bPremiere = new Date(b.premiere);

        return aPremiere === bPremiere
          ? 0
          : aPremiere > bPremiere
            ? 1
            : -1;
      });
  }

  private sort(results: IMedia[] = []): IMedia[] {
    return results
      .sort((a, b) => {
        const aTitleArray = a.title.split(' ');
        const bTitleArray = b.title.split(' ');

        if (Prefixes.includes(aTitleArray[0].toUpperCase())) {
          aTitleArray.shift();
        }

        if (Prefixes.includes(bTitleArray[0].toUpperCase())) {
          bTitleArray.shift();
        }

        const aTitle = aTitleArray.join(' ');
        const bTitle = bTitleArray.join(' ');

        return aTitle === bTitle
          ? 0
          : aTitle > bTitle
            ? 1
            : -1;
      });
  }
}
