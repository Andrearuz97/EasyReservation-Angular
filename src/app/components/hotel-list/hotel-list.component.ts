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
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;

  constructor(private hotelService: HotelService,) { }

  ngOnInit(): void {
    this.loadHotelsPaged();
  }

  cercaHotel(): void {
    if (this.searchTerm) {
        this.hotelService.ricercaHotel(this.searchTerm).subscribe(data => {
            console.log(data);
            this.hotels = data;
        });
    } else {
        this.loadHotelsPaged();
    }
  }

  loadHotelsPaged(): void {
    this.hotelService.getAllHotelsPaged(this.currentPage, this.pageSize).subscribe(response => {
      this.hotels = response.content;
      this.totalPages = response.totalPages;
    });
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.loadHotelsPaged();
  }
}
