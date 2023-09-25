import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.interface';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-room-detail',
  templateUrl: './admin-room-detail.component.html',
  styleUrls: ['./admin-room-detail.component.scss']
})
export class AdminRoomDetailComponent implements OnInit {
  roomDetail?: Room;
  hotelId?: number;
  roomId?: number;

  constructor(private roomService: RoomService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Received parameters:', params);
      if (params['hotelId'] && params['id']) {
          this.hotelId = +params['hotelId'];
          this.roomId = +params['id'];
          this.loadRoomDetails(this.hotelId, this.roomId);
      }
  });

  }

  loadRoomDetails(hotelId: number, roomId: number): void {
    this.roomService.getRoomByHotelAndRoomId(hotelId, roomId).subscribe({
      next: room => {
        console.log('Room received:', room);
        this.roomDetail = room;
      },
      error: error => {
        console.error('Error loading room details:', error);
      }
    });
  }



  goToEdit(): void {
    if (this.hotelId && this.roomId) {
      this.router.navigate(['/admin/rooms/edit', this.hotelId, this.roomId]);
    }
  }
}
