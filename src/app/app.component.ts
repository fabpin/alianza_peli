import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NavbarComponent } from './components/globals/navbar/navbar.component';
import { CarouselComponent } from './components/globals/carousel/carousel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, NavbarComponent, CarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'alianza-peli';
  faCoffee = faCoffee;
}
