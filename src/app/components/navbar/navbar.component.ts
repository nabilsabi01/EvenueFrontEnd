import { Component, OnDestroy, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './../../services/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isHomeRoute = false;
  isAdminHome = false;  // Ajouté pour vérifier la route adminHome
  role: string | undefined;
  userName: string | undefined;
  loggedIn = false;
  private userSub?: Subscription;
  @ViewChild('exampleModal') modal: ElementRef | undefined;

  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loggedIn = !!this.userService.getAllUsers();
    this.userName = localStorage.getItem('userName') || undefined;

    if (localStorage.getItem('userId')) {
      this.userService.getOneUser(localStorage.getItem('userId')!).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.userName = res.data.name;
            this.role = res.data.role;
          }
        }
      });
    }

    this.userSub = this.userService.user.subscribe(user => {
      this.loggedIn = !!user;
      this.userName = localStorage.getItem('userName') || undefined;
      if (localStorage.getItem('userId')) {
        this.userService.getOneUser(localStorage.getItem('userId')!).subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.userName = res.data.name;
              this.role = res.data.role;
            }
          }
        });
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isHomeRoute = event.url === '/home';
        this.isAdminHome = event.url === '/adminHome'; // Vérifiez si l'URL est adminHome
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  logOut() {
    this.userService.logOut();
    this.userName = undefined;
    this.role = undefined;
    this.router.navigate(['/login']); // Redirection vers la page de connexion
  }
}
