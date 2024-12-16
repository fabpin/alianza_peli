import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ThemovieDBService } from '../../../services/themovie-db.service';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  constructor(private _themovieDBService: ThemovieDBService) {}
  async handleSubmit() {
    if(this.searchForm.value.search){
      await this._themovieDBService.searchMovies(this.searchForm.value.search,1);
    }
  }

  async refresh(){
    await this._themovieDBService.refresh();
  }
}
