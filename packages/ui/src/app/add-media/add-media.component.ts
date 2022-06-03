import { Component, OnInit } from '@angular/core';
import { Media } from '../../../../app/src/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {
  results: any[] = [];
  title: string;
  service: string;
  useId: boolean;
  type: string = "";
  dtm: string = "";

  async foo(e) {
    this.results = [];
    const res = await fetch(`https://mariasbasement.com/v1/omdb?${this.useId ? 'tconst' : 'q'}=${this.title}`);
    const json = await res.json();
    this.results = json.filter(i => !(i.name || i.episode));
  }

  async add(e, item) {
    const newItem = {
      title: item.title,
      imdbId: item.id.split('/')[2],
      status: 0,
      poster: item.image.url,
      type: this.type ? parseInt(this.type) : Media[(item.Type as string).toUpperCase()],
      service: parseInt(this.service),
      premiere: this.dtm ? moment.utc(this.dtm).format() : '',
    };
    await fetch(`https://mariasbasement.com/v1/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    document.location.reload();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
