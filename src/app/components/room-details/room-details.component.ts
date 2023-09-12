import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room.interface';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  room!: Room;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    const hotelIdParam = this.route.snapshot.paramMap.get('hotelId');
const roomIdParam = this.route.snapshot.paramMap.get('roomId');


    if (hotelIdParam && roomIdParam) {
        const hotelId = +hotelIdParam;
        const roomId = +roomIdParam;
        this.roomService.getRoomByHotelAndRoomId(hotelId, roomId).subscribe(roomDetails => {
            this.room = roomDetails;
        });
    } else {
        console.error('Either Hotel ID or Room ID is not provided in the URL.');
    }
}

}
