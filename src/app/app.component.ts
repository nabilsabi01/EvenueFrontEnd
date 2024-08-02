import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './components/navbar/navbar.component';
// import { EventDetailsComponent } from './components/event-details/event-details.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPipe } from './components/searchPipe/search.pipe';
import { SearchByPricePipe } from './components/searchPipe/searchByPrice/search-by-price.pipe';
import { SearchLocationPipe } from './components/searchPipe/searchByLocation/search-location.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSliderModule,
    NavbarComponent,
    HomeComponent,
    RouterModule,
    HttpClientModule,
    FooterComponent,
    LoginComponent,
    SearchComponent,
    HttpClientModule,
    CommonModule,
    SearchPipe,
    SearchByPricePipe,
    SearchLocationPipe,
    SweetAlert2Module,
  ],
 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  title = 'evenue';
}

