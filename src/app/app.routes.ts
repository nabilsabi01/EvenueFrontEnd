import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AllReservationsComponent } from './components/all-reservations/all-reservations.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminAlleventsComponent } from './components/admin-allevents/admin-allevents.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'events', component: SearchComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'adminHome',
    component: AdminHomeComponent,
  },
  {
    path: 'reservations',
    component: AllReservationsComponent,
  },
  {
    path: 'adminevents',
    component: AdminAlleventsComponent,
  },
  {
    path: 'allusers',
    component: AllUsersComponent,
  },
 // {
   // path: 'addEvent',
    //component: CreateEventComponent,
  //},
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];
