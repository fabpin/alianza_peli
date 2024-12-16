import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ThemovieDBService } from '../../../services/themovie-db.service';
import { Movie } from '../../../models/Movie';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements AfterViewInit, OnInit{
  upcoming: Array<Movie> = [] ;

  constructor(private _themovieDBService: ThemovieDBService) {}

  async ngOnInit() {
    const data = await this._themovieDBService.getMoviesUpcoming();
    this.upcoming = data.results;
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.next();
    }, 15000);
  }

  next(){
    let change: number = 0;
    let blockSwith = true;
    this.upcoming.map( (item, pos) => {
      if(item.active && blockSwith) {
        blockSwith = false;
        change = pos + 1;
        this.upcoming[pos].active = false;
        if(change >= this.upcoming.length){
          this.upcoming[0].active = true;
        } else {
          this.upcoming[change].active = true;
        }
      }
    });
  }

  previous() {
    let change: number = 0;
    let blockSwith = true;
    this.upcoming.map( (item, pos) => {
      if(item.active && blockSwith) {
        blockSwith = false;
        change = pos - 1;
        this.upcoming[pos].active = false;
        if(change < 0){
          this.upcoming[this.upcoming.length - 1].active = true;
        } else {
          this.upcoming[change].active = true;
        }
      }
    });
  }
}
