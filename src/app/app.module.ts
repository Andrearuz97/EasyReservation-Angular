import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { RoomComponent } from './components/room/room.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HotelDetailsComponent } from './components/hotel/hotel-details/hotel-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    HotelComponent,
    RoomComponent,
    ReservationComponent,
    UserProfileComponent,
    HotelDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
