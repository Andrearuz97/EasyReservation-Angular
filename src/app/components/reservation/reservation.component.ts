import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';
import { Hotel } from 'src/app/models/hotel.model';
import { Room } from 'src/app/models/room.interface';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  hotels: Hotel[] = [];
  rooms: Room[] = [];
  selectedHotel: Hotel | null = null;
  selectedRoom: Room | null = null;
  dataCheckIn: Date | null = null;
  dataCheckOut: Date | null = null;

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
    });
  }

  onHotelSelect(hotel: Hotel | null): void {
    if (hotel) {
      this.selectedHotel = hotel;
      this.loadRoomsByHotelId(hotel.id);
    }
  }

  loadRoomsByHotelId(hotelId: number): void {
    this.roomService.getRoomsByHotelId(hotelId).subscribe(rooms => {
      this.rooms = rooms;
    }, error => {
      console.error('Errore nel caricamento delle stanze:', error);
    });
  }

  prenota(): void {
    if (this.selectedRoom && this.dataCheckIn && this.dataCheckOut) {
      const reservationData = {
        dataCheckIn: this.dataCheckIn,
        dataCheckOut: this.dataCheckOut,
        stanzaId: this.selectedRoom.id
      };

      this.reservationService.createPrenotazione(reservationData)
        .subscribe(response => {
          alert('Prenotazione effettuata con successo!');
        }, error => {
          alert('Si è verificato un errore durante la prenotazione.');
          console.error(error);
        });
    } else {
      alert('Per favore, compila tutti i campi.');
    }
  }
}
