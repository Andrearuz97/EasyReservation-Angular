// hotel-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {

  hotels: any[] = [];

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe(
      data => {
        this.hotels = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}
