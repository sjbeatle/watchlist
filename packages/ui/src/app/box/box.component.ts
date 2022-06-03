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
      const next = this.item.status + 1;
      const status = next > 2 ? 0 : next;

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

  async delete() {
    const confirmation = confirm("R U Sure?");
    if (confirmation) {
      if (this.allowAnyClick && this.allowSingleClick) {
        this.allowAnyClick = false;
        await fetch(`https://mariasbasement.com/v1/media/${this.item._id}`, {
          method: 'DELETE',
        });
      }
      this.allowAnyClick = true;
      document.location.reload();
    }
  }

  @HostBinding('style.background-image') get backgroundImage() {
    if (this.item.poster) {
      return `url("${this.item.poster}")`;
    } else {
      return `#${this.color}`;
    }
  }
}
