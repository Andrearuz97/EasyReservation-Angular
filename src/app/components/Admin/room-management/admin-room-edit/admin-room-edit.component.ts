import { Component, OnInit } from '@angular/core';
import { RoomService,  } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { Room } from 'src/app/models/room.interface';
import { Hotel } from 'src/app/models/hotel.model';
import { TipoStanza } from 'src/app/models/tipo-stanza.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-room-edit',
  templateUrl: './admin-room-edit.component.html',
  styleUrls: ['./admin-room-edit.component.scss']
})
export class AdminRoomEditComponent implements OnInit {
  room?: Room;
  hotels: Hotel[] = [];
  roomTypes: string[] = Object.values(TipoStanza);


  constructor(
    private roomService: RoomService,
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHotels();

    this.route.params.subscribe(params => {
      const hotelId = +params['hotelId'];
      if (params['roomId']) {
        const roomId = +params['roomId'];
        this.loadRoom(hotelId, roomId);
      } else {
        this.room = {
          id: 0,
          numeroStanza: 0,
          tipo: '',
          prezzo: 0,
          imageUrl: '',
          hotel: {
            id: hotelId,
            nome: '',
            indirizzo: '',
            descrizione: '',
            stelle: 0
          }
        };
      }
    });
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe(data => {
      this.hotels = data;
    });
  }

  loadRoom(hotelId: number, roomId: number): void {
    this.roomService.getRoomByHotelAndRoomId(hotelId, roomId).subscribe(room => {
      this.room = room;
    });
  }

  saveRoom(): void {
    if (this.room && this.room.hotel) {
      const hotelId = this.room.hotel.id;
      if (this.room.id) {
        this.roomService.updateRoomInHotel(hotelId, this.room.id, this.room).subscribe(updatedRoom => {
          alert('Stanza aggiornata con successo!');
          this.router.navigate(['/admin/rooms'])
        });
      } else {
        this.roomService.addRoomToHotel(hotelId, this.room).subscribe(newRoom => {
          alert('Stanza creata con successo!');
          this.router.navigate(['/admin/rooms']);

        });
      }
    }
  }

  onFileChange(event: any) {
  }
}
