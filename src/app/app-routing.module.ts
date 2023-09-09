import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { HotelListComponent } from './components/hotel/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './components/hotel/hotel-details/hotel-details.component';
import { RoomDetailsComponent } from './components/room/room-details/room-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'hotels', component: HotelListComponent },
  { path: 'hotel/:id', component: HotelDetailsComponent },
  { path: 'room/:id', component: RoomDetailsComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
