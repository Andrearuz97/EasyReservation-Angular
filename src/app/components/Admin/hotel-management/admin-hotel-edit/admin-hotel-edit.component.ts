import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-hotel-edit',
  templateUrl: './admin-hotel-edit.component.html',
  styleUrls: ['./admin-hotel-edit.component.scss']
})
export class AdminHotelEditComponent implements OnInit {
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
    if (idStr && idStr !== 'new') {
      const id = +idStr;


      if (isNaN(id)) {
        console.error('ID non valido:', idStr);
        return;
      }

      this.hotelService.getHotelById(id).subscribe((data: Hotel) => {
        this.hotel = data;
      });
    }

  }



  saveHotel(): void {
    if (this.hotel.id) {
      this.hotelService.updateHotel(this.hotel.id, this.hotel).subscribe(() => {
        alert('Hotel aggiornato con successo!');
        this.router.navigate(['/admin/hotels']);
      });
    } else {
      this.hotelService.addHotel(this.hotel).subscribe(() => {
        alert('Hotel creato con successo!');
        this.router.navigate(['/admin/hotels']);
      });
    }
  }
}
