import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxComponent } from './box/box.component';
import { DisneyPlusComponent } from './streamer/disney-plus/disney-plus.component';
import { NetflixComponent } from './streamer/netflix/netflix.component';
import { AppleTvPlusComponent } from './streamer/apple-tv-plus/apple-tv-plus.component';
import { HboMaxComponent } from './streamer/hbo-max/hbo-max.component';
import { AppleTvComponent } from './streamer/apple-tv/apple-tv.component';
import { AMCComponent } from './streamer/amc/amc.component';
import { PeacockComponent } from './streamer/peacock/peacock.component';
import { HuluComponent } from './streamer/hulu/hulu.component';
import { AmazonPrimeVideoComponent } from './streamer/amazon-prime-video/amazon-prime-video.component';
import { MovieComponent } from './type/movie/movie.component';
import { SeriesComponent } from './type/series/series.component';
import { ConcertComponent } from './type/concert/concert.component';
import { SpecialComponent } from './type/special/special.component';
import { SortComponent } from './icon/sort/sort.component';
import { DoneIconComponent } from './icon/done-icon/done-icon.component';
import { TrailerComponent } from './type/trailer/trailer.component';
import { YoutubeComponent } from './streamer/youtube/youtube.component';
import { DocumentaryComponent } from './type/documentary/documentary.component';
import { HeaderComponent } from './header/header.component';
import { PlusComponent } from './icon/plus/plus.component';
import { AddMediaComponent } from './add-media/add-media.component';
import { CloseComponent } from './icon/close/close.component';
import { FormsModule } from '@angular/forms';
import { ParamountComponent } from './streamer/paramount/paramount.component';
import { DailyWireComponent } from './streamer/daily-wire/daily-wire.component';
import { TrashComponent } from './icon/trash/trash.component';

@NgModule({
  declarations: [
    TrashComponent,
    AMCComponent,
    PeacockComponent,
    ParamountComponent,
    DailyWireComponent,
    AppComponent,
    BoxComponent,
    DisneyPlusComponent,
    NetflixComponent,
    AppleTvPlusComponent,
    HboMaxComponent,
    AppleTvComponent,
    HuluComponent,
    AmazonPrimeVideoComponent,
    MovieComponent,
    SeriesComponent,
    ConcertComponent,
    SpecialComponent,
    SortComponent,
    DoneIconComponent,
    TrailerComponent,
    YoutubeComponent,
    DocumentaryComponent,
    HeaderComponent,
    PlusComponent,
    AddMediaComponent,
    CloseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
