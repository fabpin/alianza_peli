import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import axios, { AxiosResponse, AxiosHeaders } from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultSearch, ResultMovieDetail } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class ThemovieDBService {
  private params: AxiosHeaders;
  private _movies = new BehaviorSubject<ResultSearch>({
    "page": 0,
    "results": [],
    "total_pages": 0,
    "total_results": 0
  });
  private _querySearch = new BehaviorSubject<string>('');
  private _typeRequest = new BehaviorSubject<boolean>(true);
  private _movieSelected = new BehaviorSubject<ResultMovieDetail>({
    "adult": false,
    "backdrop_path": '',
    "belongs_to_collection": {
      "id": 0,
      "name": '',
      "poster_path": '',
      "backdrop_path": ''
    },
    "budget": 0,
    "genres": [],
    "homepage": '',
    "id": 0,
    "imdb_id": '',
    "origin_country": [],
    "original_language": '',
    "original_title": '',
    "overview": '',
    "popularity": 0,
    "poster_path": '',
    "production_companies": [],
    "production_countries": [],
    "release_date": '',
    "revenue": 0,
    "runtime": 0,
    "spoken_languages": [],
    "status": '',
    "tagline": '',
    "title": '',
    "video": false,
    "vote_average": 0,
    "vote_count": 0
  });
  constructor() {
    this.params = new AxiosHeaders();
    this.params.set('Authorization', 'Bearer '+environment.TOKEN_THEMOVIEDB);
  }

  async getMoviesUpcoming(page: number = 1){
    let url = environment.URI_THEMOVIEDB+
      environment.VERSION_API_THEMOVIEDB+
      environment.SUB_URI_THEMOVIEDB_UPCOMING;
    return await axios.get(url , {headers: this.params, params: {language: 'en-US', page}})
        .then( response => {
          response.data.results.forEach( (item:any, index:any) => {
            if(index === 0){
              item['active'] = true;
            } else {
              item['active'] = false;
            };
          });
          return response.data;
        })
        .catch((error:any) => {
          console.error(error);
          alert('Sucedio un error comunicarse con el administrador');
          return {
            "dates": {
              "maximum": "2025-01-08",
              "minimum": "2024-12-18"
            },
            "page": 1,
            "results": [],
            "total_pages": 0,
            "total_results": 0
          }
        });
  }

  async getMovies(page: number = 1) {
    let url = environment.URI_THEMOVIEDB+
      environment.VERSION_API_THEMOVIEDB+
      environment.SUB_URI_THEMOVIEDB_MOVIE;
    return await axios.get(url , {headers: this.params, params: {language: 'en-US', page}})
      .then( response => {
        return response.data;
      })
      .catch((error:any) => {
        console.error(error);
        alert('Sucedio un error comunicarse con el administrador');
        return {
          "page": 1,
          "results": [],
          "total_pages": 0,
          "total_results": 0
        }
      });
  }

  async refresh(){
    let movies = await this.getMovies();
    this._movies.next(movies);
    this._typeRequest.next(true);
  }

  async searchMovies(query: string, page:number) {
    let url = environment.URI_THEMOVIEDB+
      environment.VERSION_API_THEMOVIEDB+
      environment.SUB_URI_THEMOVIEDB_SEARCH;
    return await axios.get(url , {headers: this.params, params: {include_adult: false, language: 'en-US',query, page}})
      .then( response => {
        this._movies.next(response.data);
        console.info('search: ', response.data);
        this._querySearch.next(query);
        this._typeRequest.next(false);
        return response.data;
      })
      .catch((error:any) => {
        console.error(error);
        alert('Sucedio un error comunicarse con el administrador');
        return {
          "page": 1,
          "results": [],
          "total_pages": 0,
          "total_results": 0
        }
      });
  }

  async detailMovies(id: number) {
    let url = environment.URI_THEMOVIEDB+
      environment.VERSION_API_THEMOVIEDB+
      environment.SUB_URI_THEMOVIEDB_DETAIL+'/'+id;
    return await axios.get(url , {headers: this.params})
      .then( response => {
        console.info('detail: ', response.data);
        this._movieSelected.next(response.data);
        return response.data;
      })
      .catch((error:any) => {
        console.error(error);
        alert('Sucedio un error comunicarse con el administrador');
        return {
          "adult": false,
          "backdrop_path": '',
          "belongs_to_collection": {
            "id": 0,
            "name": '',
            "poster_path": '',
            "backdrop_path": ''
          },
          "budget": 0,
          "genres": [],
          "homepage": '',
          "id": 0,
          "imdb_id": '',
          "origin_country": [],
          "original_language": '',
          "original_title": '',
          "overview": '',
          "popularity": 0,
          "poster_path": '',
          "production_companies": [],
          "production_countries": [],
          "release_date": '',
          "revenue": 0,
          "runtime": 0,
          "spoken_languages": [],
          "status": '',
          "tagline": '',
          "title": '',
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      });
  }

  getMoviesSubcription():Observable<ResultSearch>{
    return this._movies.asObservable();
  }

  getSearchQuerySubcription():Observable<string>{
    return this._querySearch.asObservable();
  }

  getTypeRquestSubcription():Observable<boolean>{
    return this._typeRequest.asObservable();
  }

  getDetailMovieSubcription():Observable<ResultMovieDetail>{
    return this._movieSelected.asObservable();
  }
}
