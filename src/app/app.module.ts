import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { UserReservationComponent } from './components/user-reservation/user-reservation.component';
import { EditReservationComponent } from './components/edit-reservation/edit-reservation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    ReservationComponent,
    UserProfileComponent,
    HotelDetailsComponent,
    HotelListComponent,
    HomeComponent,
    RoomDetailsComponent,
    UserReservationComponent,
    EditReservationComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
