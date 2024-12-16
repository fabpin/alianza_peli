import {Component, OnDestroy, OnInit} from '@angular/core';
import { ResultMovieDetail } from '../../models/Movie';
import { ThemovieDBService } from '../../services/themovie-db.service';
import {Subscription} from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy{
  movieDetail!: ResultMovieDetail;
  private _subscription!: Subscription;
  constructor(private _themovieDBService: ThemovieDBService, private _location: Location) {}

  async ngOnInit() {
    this._subscription = await this._themovieDBService.getDetailMovieSubcription().subscribe( detail => {
      this.movieDetail = detail;
    });
  }

  backPage(){
    this._location.back();
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
