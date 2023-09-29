import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/room.interface';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-room-list',
  templateUrl: './admin-room-list.component.html',
  styleUrls: ['./admin-room-list.component.scss']
})
export class AdminRoomListComponent implements OnInit {
  rooms: Room[] = [];
  hotels: Hotel[] = [];
  selectedHotelId!: number
  editingRoom: Room | null = null;
  room: Partial<Room> = {};

  newRoom: Partial<Room> = {};

  constructor(private roomService: RoomService, private hotelService: HotelService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadHotels();
    const storedHotelId = sessionStorage.getItem('selectedHotelId');
    if (storedHotelId) {
      this.selectedHotelId = +storedHotelId;
      this.loadRooms(this.selectedHotelId);
    }

    this.route.params.subscribe(params => {
      if (params['hotelId']) {
        const hotelId = +params['hotelId'];
        this.loadRooms(hotelId);
      }
    });
  }

  createNewRoom(): void {
    this.router.navigate(['/admin/rooms/edit', this.selectedHotelId]);
  }
  editRoom(roomId: number): void {
    console.log('selectedHotelId:', this.selectedHotelId);
    console.log('roomId:', roomId);
    this.router.navigate(['/admin/rooms/edit', this.selectedHotelId, roomId]);
}

  confirmAndEdit(): void {
    if (this.editingRoom) {
      this.roomService.updateRoomInHotel(this.selectedHotelId, this.editingRoom.id, this.editingRoom).subscribe(() => {
        this.loadRooms(this.selectedHotelId);
        this.editingRoom = null;
      });
    }
  }
  loadHotels(): void {
    this.hotelService.getHotels().subscribe(hotels => this.hotels = hotels);
  }
  loadRooms(hotelId: number | null): void {
    if (hotelId !== null) {
      sessionStorage.setItem('selectedHotelId', hotelId.toString());
      this.roomService.getRoomsByHotelId(hotelId).subscribe(rooms => this.rooms = rooms);
    }
  }

  updateFotoUrl(url: string): void {
    if (this.editingRoom) {
        this.editingRoom.imageUrl = url;
    } else {
        this.newRoom.imageUrl = url;
    }
}


viewDetails(roomId: number): void {
  this.router.navigate(['/admin/hotels', this.selectedHotelId, 'rooms', roomId]);
}



confirmAndDelete(roomId: number): void {
  if (window.confirm('Sei sicuro di voler eliminare questa stanza?')) {
      this.roomService.deleteRoomFromHotel(this.selectedHotelId, roomId).subscribe(
          () => {
              this.loadRooms(this.selectedHotelId);
              alert("Stanza eliminata con successo");
          },
          (error) => {
              console.error('Error deleting room:', error);
              alert('Si è verificato un errore durante l\'eliminazione della stanza. Per favore, riprova.');
          }
      );
  }
}



  goToCreateRoom(): void {
    this.router.navigate(['/admin/rooms/edit']);
  }


  openEditModal(room: Room): void {
    this.editingRoom = room;
  }

  updateNumeroStanza(value: number): void {
    if (this.editingRoom) {
      this.editingRoom.numeroStanza = value;
    }
  }

  onFileChange(event: any): void {
  }


}
