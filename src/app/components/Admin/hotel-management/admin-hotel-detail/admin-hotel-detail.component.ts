import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-hotel-detail',
  templateUrl: './admin-hotel-detail.component.html',
  styleUrls: ['./admin-hotel-detail.component.scss']
})
export class AdminHotelDetailComponent implements OnInit {
  hotel: Hotel = {
    id: 0,
    nome: '',
    indirizzo: '',
    descrizione: '',
    stelle: 0
  };

  constructor(private hotelService: HotelService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    if (idStr) {
      const id = +idStr;
      this.hotelService.getHotelById(id).subscribe({
        next: (data: Hotel) => {
          this.hotel = data;
        },
        error: error => {
          console.error("Errore nel recuperare i dettagli dell'hotel:", error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/hotels']);
  }
}
