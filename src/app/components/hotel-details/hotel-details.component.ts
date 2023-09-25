import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa questo
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { Room } from 'src/app/models/room.interface';
import { RoomService } from 'src/app/services/room.service';
@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  hotel: Hotel | undefined;
  rooms: Room[] = [];
  hotelId!: number;

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadHotelDetails();
  }

  loadHotelDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Ricava l'ID dall'URL
    this.hotelId = id; // Imposta il valore di hotelId
    this.hotelService.getHotelById(id).subscribe(hotel => {
      this.hotel = hotel;
      // Una volta ottenuto l'hotel, carica le stanze per quel particolare hotel
      this.roomService.getRoomsByHotelId(id).subscribe(rooms => {
        this.rooms = rooms;
      });
    });
  }
}
