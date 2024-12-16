import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { ThemovieDBService } from '../../services/themovie-db.service';
import {Movie} from '../../models/Movie';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy{
  movies: Array<Movie> = [];
  last_page: number = 0;
  page: number = 1;
  first_pagination: number = 1;
  second_pagination: number = 2;
  third_pagination: number = 3;
  private _subscription!: Subscription;
  private _subscriptionQuery!: Subscription;
  private _subscriptionTypeRequest!: Subscription;
  private _query: string = '';
  private _typeRequest: boolean = true;
  constructor(private _themovieDBService: ThemovieDBService, private _router:Router) {}
  async ngOnInit() {
    let data = await this._themovieDBService.getMovies();
    this.movies = data.results;
    this.last_page = data.total_pages;
    this.page = data.page;
  }

  async ngAfterViewInit() {
    this._subscription = this._themovieDBService.getMoviesSubcription().subscribe(response => {
      this.movies = response.results;
      this.last_page = response.total_pages;
      this.page = response.page;
      this.first_pagination = 1;
      this.second_pagination = 2;
      this.third_pagination = 3;
    });

    this._subscriptionQuery = this._themovieDBService.getSearchQuerySubcription().subscribe(query => {
      this._query = query;
    });

    this._subscriptionTypeRequest = this._themovieDBService.getTypeRquestSubcription().subscribe( typeRequest => {
      this._typeRequest = typeRequest;
    });
  }

  next(){
    this.first_pagination = this.first_pagination + 3;
    this.second_pagination = this.second_pagination + 3;
    this.third_pagination = this.third_pagination + 3;
  }

  previous() {
    if(this.first_pagination - 3 >= 1){
      this.first_pagination = this.first_pagination - 3;
      this.second_pagination = this.second_pagination - 3;
      this.third_pagination = this.third_pagination - 3;
    }
  }

  async pagination(page: number){
    if(this._typeRequest){
      let data = await this._themovieDBService.getMovies(page);
      this.movies = data.results;
      this.last_page = data.total_pages;
      this.page = data.page;
    } else {
      let data = await this._themovieDBService.searchMovies(this._query,page);
      this.movies = data.results;
      this.last_page = data.total_pages;
      this.page = data.page;
    }
  }

  async detail(id: number | null){
    console.log('entro end detail');
    if(id){
      await this._themovieDBService.detailMovies(id);
    }
    this._router.navigate(['/detail']);
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
    this._subscriptionQuery?.unsubscribe();
    this._subscriptionTypeRequest?.unsubscribe();
  }
}
