import { Component, HostBinding, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {
  @Input() item: any;

  allowAnyClick = true;
  allowSingleClick = true;

  get color () {
    return Math.floor(Math.random()*16777215).toString(16);
  }

  get premiere () {
    if (this.item.premiere) {
      return moment.utc(this.item.premiere).format('M/D');
    }
  }

  async toggleWatched(e) {
    if (this.allowAnyClick) {
      this.allowSingleClick = false;
      this.allowAnyClick = false;
      const status = this.item.status === 2 ? 0 : 2;

      await fetch(`https://mariasbasement.com/v1/media/${this.item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
        }),
      });

      this.allowSingleClick = true;
      this.allowAnyClick = true;
      document.location.reload();
    }
  }

  showDetails(e) {
    if (this.item.status === 1) {
      return;
    }

    setTimeout(async () => {
      if (this.allowAnyClick && this.allowSingleClick) {
        this.allowAnyClick = false;
        await fetch(`https://mariasbasement.com/v1/media/${this.item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 1,
          }),
        });
      }
      this.allowAnyClick = true;
      document.location.reload();
    }, 300);
  }

  @HostBinding('style.background-image') get backgroundImage() {
    if (this.item.poster) {
      return `url("${this.item.poster}")`;
    } else {
      return `#${this.color}`;
    }
  }
}
