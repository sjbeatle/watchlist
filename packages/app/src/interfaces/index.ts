export interface IRatings {
  Source: string;
  Value: string;
}

export interface IOMDBResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IRatings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export enum Environments {
  PRODUCTION = 'production',
  STAGE = 'stage',
  TEST = 'test',
  DEVELOPMENT = 'development',
}

export enum Status {
  UNWATCHED = 0,
  WATCHING = 1,
  WATCHED = 2,
}

export enum Service {
  DISNEY_PLUS = 0,
  NETFLIX = 1,
  PRIME_VIDEO = 2,
  APPLE_TV = 3,
  APPLE_TV_PLUS = 4,
  HBO_MAX = 5,
  HULU = 6,
  YOUTUBE = 7,
  AMC = 8,
  DAILY_WIRE = 9,
  PEACOCK = 10,
  PARAMOUNT = 11,
}

export enum Media {
  MOVIE = 0,
  SERIES = 1,
  SPECIAL = 2,
  CONCERT = 3,
  DOCUMENTARY = 4,
  TRAILER = 5,
}

export interface IOMDBQueryParams {
  q: string;
}

export interface IMDB8QueryParams {
  q: string;
  tconst: string;
}

export interface IMedia {
  title: string;
  imdbId: string;
  status: Status;
  service: Service;
  poster: string;
  type: Media;
  premiere: Date;
}


/* IMDB8 from rapidapi
-----------------------------------------------*/
export interface IMDB8Image {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface IMDB8Roles {
  character: string;
  characterId: string;
}

export interface IMDB8Principles {
  disambiguation: string;
  id: string;
  legacyNameText: string;
  name: string;
  billing: number;
  category: string;
  characters: string[];
  roles: IMDB8Roles[];
  attr: string[]
}

export interface IMDB8Response {
  episode: number;
  name: string;
  id: string;
  image: IMDB8Image;
  runningTimeInMinutes: number;
  title: string;
  titleType: string;
  year: number;
  principals: IMDB8Principles[]
}

export interface ICovers {
  artist: string;
  songs: string[];
}

export enum State {
  NY = 'NY',
  CT = 'CT',
  PA = 'PA',
  NJ = 'NJ',
  MA = 'MA',
  NH = 'NH',
}

export enum Meridian {
  ANTE = 'am',
  POST = 'pm',
}

export interface IVenue {
  _id: string;
  name: string;
  phone: string;
  email: string;
  website: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: State;
  zip: string;
}

export interface IPerformance {
  venue: IVenue;
  date: number;
  timeStart: string;
  timeEnd: string;
  notes: string;
  revenue: number;
  coverCharge: number;
  isCanceled: boolean;
}
