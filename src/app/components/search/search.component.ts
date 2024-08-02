import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchPipe } from '../searchPipe/search.pipe';
import { SearchByPricePipe } from '../searchPipe/searchByPrice/search-by-price.pipe';
import { SearchLocationPipe } from '../searchPipe/searchByLocation/search-location.pipe';
import { EventService } from '../../services/event.service';
import { Event } from '../../interface/event';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchPipe,
    SearchByPricePipe,
    SearchLocationPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  events: Event[] = [];
  min: any[] = [];
  name: string = '';
  location: string = '';
  price: string = '';
  img: string = '';
  eventPage: Event[] = [];
  numberOfPage: number = 0;
  numberOfPageArray: number[] = [];
  counter: number = 0;
  lengthOfData: number = 0;
  imageUrl?: string = '';
  hasaphoto?: boolean;
  imageName?: string;

  constructor(
    private router: Router,
    private eventService: EventService,
  ) {}

  regSearch() {
    this.eventService.searchEvents(this.name, this.location).subscribe({
      next: (res: Event[]) => {
        this.events = res;
        this.updatePagination();
      },
      error: (err) => console.error('Error searching events:', err)
    });
  }

  Viewmore(id: number) {
    this.router.navigate([`/details/${id}`]);
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res: Event[]) => {
        this.eventPage = res;
        this.lengthOfData = this.eventPage.length;
        this.numberOfPage = Math.ceil(this.lengthOfData / 7);
        for (let x = 1; x <= this.numberOfPage; x++) {
          this.numberOfPageArray.push(x);
        }

        let i;

        for (i = 0; i < 7; i++) {
          this.events[i] = this.eventPage[i];
        }
        this.counter = i;
        this.getData();
      },
      error: (err) => console.error('Error fetching events:', err)
    });
  }

  nextpage(page: number) {
    let i;
    this.events = [];
    this.counter = 7 * (page - 1);

    for (i = this.counter; i < 7 + this.counter && i < this.lengthOfData; i++) {
      this.events[i - this.counter] = this.eventPage[i];
    }

    this.getData();

    this.counter = i;
  }

  getData() {
    this.events.forEach((event) => {
      if (event.image) {
        this.imageName = event.image;
      }

      // Assuming the min date is based on the event date
      this.min.push(event.date);
    });
  }

  showPhoto() {
    this.hasaphoto = true;
  }

  updatePagination(): void {
    this.numberOfPage = Math.ceil(this.events.length / 7);
    this.numberOfPageArray = Array.from({ length: this.numberOfPage }, (_, i) => i + 1);
  }
}
