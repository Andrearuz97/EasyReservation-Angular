import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {

  hotels: Hotel[] = [];
  nomeRicerca: string = '';


  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.loadHotels();
  }
  cercaHotel(): void {
    if (this.nomeRicerca) {
      this.hotelService.ricercaHotelPerNome(this.nomeRicerca).subscribe(data => {
        this.hotels = data;
      });
    } else {
      this.loadHotels();
    }
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe(data => {
      this.hotels = data;
    });
  }
}
