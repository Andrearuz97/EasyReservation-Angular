import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { UserReservationComponent } from './components/user-reservation/user-reservation.component';
import { EditReservationComponent } from './components/edit-reservation/edit-reservation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard] },
  { path: 'hotels', component: HotelListComponent, canActivate: [AuthGuard] },
  { path: 'hotel/:id', component: HotelDetailsComponent, canActivate: [AuthGuard] },
  { path: 'stanza/hotel/:hotelId/:roomId', component: RoomDetailsComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'my-reservations', component: UserReservationComponent, canActivate: [AuthGuard] },
  { path: 'user-reservation/:hotelId/:roomId', component: ReservationComponent },
  { path: 'edit-reservation/:id', component: EditReservationComponent, canActivate: [AuthGuard] },

  // Rotte per la sezione admin:
  { path: 'admin', loadChildren: () => import('./components/Admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },

  // Rotta di fallback:
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
