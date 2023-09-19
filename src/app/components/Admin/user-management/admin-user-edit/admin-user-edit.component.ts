import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation.interface';
import { ReservationService } from 'src/app/services/reservation.service';
import { Location } from '@angular/common';
import { Room } from 'src/app/models/room.interface';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss']
})
export class AdminUserEditComponent implements OnInit {
  booking!: Reservation;
  rooms: Room[] = [];
  hotels: Hotel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private hotelService: HotelService,
    private roomService: RoomService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const bookingId = this.route.snapshot.params['id'];

    // Carica gli hotel
    this.hotelService.getHotels().subscribe(hotels => {
      this.hotels = hotels;

      // Dopo aver caricato gli hotel, carica la prenotazione
      this.reservationService.getPrenotazioneById(+bookingId).subscribe(response => {
        this.booking = response;

        // Carica le stanze basate sull'hotel della prenotazione
        this.loadRooms(this.booking.hotel.id);
      });
    });
  }

  loadRooms(hotelId: number): void {
    this.roomService.getRoomsByHotelId(hotelId).subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  goBack(): void {
    this.location.back();
  }

  editBooking(bookingId: number): void {
    this.router.navigate(['/admin/users/edit', bookingId]);
  }

  updateBooking(): void {
    this.reservationService.updatePrenotazione(this.booking.id, this.booking).subscribe(() => {
      this.router.navigate(['/admin/user/list']);
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/user/list']);
  }
}
