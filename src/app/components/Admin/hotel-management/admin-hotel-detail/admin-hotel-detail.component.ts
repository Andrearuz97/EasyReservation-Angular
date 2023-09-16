import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private hotelService: HotelService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    if (idStr) {
        const id = +idStr;
        this.hotelService.getHotelById(id).subscribe((data: Hotel) => {
            this.hotel = data;
        });
    } else {
console.error("error")    }

  }
}
