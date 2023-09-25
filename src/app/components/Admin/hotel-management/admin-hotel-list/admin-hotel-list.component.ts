import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-hotel-list',
  templateUrl: './admin-hotel-list.component.html',
  styleUrls: ['./admin-hotel-list.component.scss']
})
export class AdminHotelListComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.fetchHotels();
  }

  fetchHotels(): void {
    this.hotelService.getHotels().subscribe((data: Hotel[]) => {
      this.hotels = data;
    });
  }

  deleteHotel(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo hotel?')) {
      this.hotelService.deleteHotel(id).subscribe({
        next: () => {
          alert('Hotel eliminato con successo!');
          this.fetchHotels();
        },
        error: error => {
          console.error(error);
          alert('Errore durante l\'eliminazione dell\'hotel.');
        }
      });
    }
  }


  navigateToAddHotel(): void {
    this.router.navigate(['/admin/hotels/new']);
  }

}
