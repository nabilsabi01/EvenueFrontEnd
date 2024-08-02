
// src/app/services/booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Booking} from "../interfaces/reservation";
import {BookingDTO} from "../interfaces/BookingDto";




@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  reserveTickets(bookingRequest: BookingDTO): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/reserve`, bookingRequest);
  }

  getAllBookingsByUser(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/all/bookings`);
  }
}
