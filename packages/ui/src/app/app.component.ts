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
  serviceFilter = -1;

  ngOnInit() {
    this.getWatchlist();
  }

  async getWatchlist(): Promise<void> {
    const response = await fetch('https://mariasbasement.com/v1/media', {
      method: 'GET',
    });
    const json = await response.json();
    const sortedJson = this.sort(json as IMedia[]);
    if (this.serviceFilter > -1) {
      this.watchList = sortedJson.filter(a => a.service === this.serviceFilter)
    } else {
      this.watchList = sortedJson;
    }
  }

  get watching(): IMedia[] {
    return this.watchList.filter(a => a.status === 1);
  }

  get unwatched(): IMedia[] {
    return this.watchList.filter(a => a.status === 0);
  }

  get watched(): IMedia[] {
    return this.watchList.filter(a => a.status === 2);
  }

  get unwatchedTrailer(): IMedia[] {
    return this.unwatched.filter(a => a.type === 5);
  }

  get unwatchedPremiere(): IMedia[] {
    return this.unwatched.filter(a => a.type !== 5 && !!a.premiere);
  }

  get unwatchedNonPremiere(): IMedia[] {
    return this.unwatched.filter(a => a.type !== 5 && !a.premiere);
  }

  get premierePriority(): IMedia[] {
    return [
      ...this.unwatchedTrailer,
      ...this.unwatchedPremiere.sort((a, b) => {
        const aPremiere = new Date(a.premiere).getTime();
        const bPremiere = new Date(b.premiere).getTime();

        return aPremiere === bPremiere
          ? 0
          : aPremiere - bPremiere;
      }),
      ...this.unwatchedNonPremiere,
    ];
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

  filter(id: number) {
    console.log('>> TESTING >> id', id);
    if (id === this.serviceFilter) {
      this.serviceFilter = -1;
    } else {
      this.serviceFilter = id;
    }

    this.getWatchlist();
  }
}
