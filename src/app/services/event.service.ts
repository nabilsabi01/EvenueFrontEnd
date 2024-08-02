import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../interface/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8080/api/events'; // Adjust the port if necessary

  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`${this.baseUrl}/${id}`);
  }

  createEvent(eventData: Event): Observable<Event> {
    return this.httpClient.post<Event>(this.baseUrl, eventData);
  }

  updateEvent(id: number, eventData: Event): Observable<Event> {
    return this.httpClient.put<Event>(`${this.baseUrl}/${id}`, eventData);
  }

  deleteEvent(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchEvents(title?: string, location?: string): Observable<Event[]> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title);
    }
    if (location) {
      params = params.set('location', location);
    }
    return this.httpClient.get<Event[]>(`${this.baseUrl}/search`, { params });
  }
}
