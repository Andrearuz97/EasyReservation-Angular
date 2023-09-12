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
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
        const id = +idParam;
        this.roomService.getRoomById(id).subscribe(roomDetails => {
            this.room = roomDetails;
        });
    } else {
        console.error('Room ID is not provided in the URL.');
    }
  }
}
