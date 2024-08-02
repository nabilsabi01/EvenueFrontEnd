import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  constructor(private _HttpClient: HttpClient) { }
  getEvents(): Observable<any> {
    return this._HttpClient.get('http://localhost:7005/events')
  }
  getAllReservations(): Observable<any> {
    return this._HttpClient.get('http://localhost:7005/reservations');
  }
  getAllUsers():Observable<any>{
    return this._HttpClient.get('http://localhost:7005/users')
  }

  getOneEvents(id: Number): Observable<any> {
    return this._HttpClient.get(`http://localhost:7005/events/${id}`)
  }
  deleteUser(id: string): Observable<any> {
    return this._HttpClient.delete(`http://localhost:7005/users/${id}`)
  }

  deleteEvent(id: number): Observable<any> {
    return this._HttpClient.delete(`http://localhost:7005/events/${id}`)
  }
}
