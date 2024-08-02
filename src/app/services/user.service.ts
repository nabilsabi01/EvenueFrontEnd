import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs";

export interface JwtAuthResponse {
  accessToken: string;
  tokenType: string;
  userName: string;
  userRole: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/auth'; // adjust as needed
  private userSubject: BehaviorSubject<boolean>;
  public user: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string): Observable<JwtAuthResponse> {
    return this.http.post<JwtAuthResponse>(`${this.apiUrl}/login`, { userNameOrEmail: email, password })
      .pipe(map(response => {
        if (response && response.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          localStorage.setItem('userRole', response.userRole);
          localStorage.setItem('userName', response.userName);
          localStorage.setItem('userId', response.userId.toString());
          this.userSubject.next(true);
        }
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.userSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getCurrentUserName(): string | null {
    return localStorage.getItem('userName');
  }

  getCurrentUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.userSubject.next(false);
  }

  getUser(): any {
    return localStorage.getItem('currentUser');
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  getOneUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }
}
