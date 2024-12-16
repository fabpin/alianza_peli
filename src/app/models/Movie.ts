import {Genres} from './Genres';
import { CompaniesLogo } from './CompaniesLogo';
import { CountryProduction } from './CountryProduction';
import { SpokenLenguaje } from './SpokenLenguaje';

export interface Movie {
  "adult": boolean,
  "backdrop_path": string | null,
  "genre_ids": Array<number> | Array<null>,
  "id": number | null,
  "original_language": string | null,
  "original_title": string | null,
  "overview": string | null,
  "popularity": number | null,
  "poster_path": string | null,
  "release_date": string | null,
  "title": string | null,
  "video": boolean,
  "vote_average": number | null,
  "vote_count": number | null,
  "active"?: boolean
};

export interface ResultSearch {
  "page": number,
  "results": Array<Movie>,
  "total_pages": number,
  "total_results": number
}

export interface ResultMovieDetail {
  "adult": boolean,
  "backdrop_path": string | null,
  "belongs_to_collection": {
    "id": number | null,
    "name": string | null,
    "poster_path": string | null,
    "backdrop_path": string | null
  },
  "budget": number | null,
  "genres": Array<Genres> | Array<null>,
  "homepage": string | null,
  "id": number | null,
  "imdb_id": string | null,
  "origin_country": Array<string> | Array<null>,
  "original_language": string | null,
  "original_title": string | null,
  "overview": string | null,
  "popularity": number | null,
  "poster_path": string | null,
  "production_companies": Array<CompaniesLogo> | Array<null>,
  "production_countries": Array<CountryProduction> | Array<null>,
  "release_date": string | null,
  "revenue": number | null,
  "runtime": number | null,
  "spoken_languages": Array<SpokenLenguaje> | Array<null>,
  "status": string | null,
  "tagline": string | null,
  "title": string | null,
  "video": boolean,
  "vote_average": number | null,
  "vote_count": number | null
}
