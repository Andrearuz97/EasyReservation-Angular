import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotels: Hotel[] = [];
  isLoggedIn = false;
  currentYear: number = new Date().getFullYear();

  constructor(private hotelService: HotelService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadHotels();
    this.checkLoginStatus();
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe((data: Hotel[]) => {
      this.hotels = data;
    });
  }

  checkLoginStatus(): void {
    const user = this.authService.getUserDetails();
    this.isLoggedIn = !!user;
  }
}
