import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ReservationService } from 'src/app/services/reservation.service';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room.interface';
import { Hotel } from 'src/app/models/hotel.model';
@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss']
})
export class AdminUserEditComponent implements OnInit {
  bookingForm: FormGroup;
  rooms: Room[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private location: Location
  ) {
    this.bookingForm = new FormGroup({
      dataCheckIn: new FormControl(null),
      dataCheckOut: new FormControl(null),
      stanzaId: new FormControl(null)
    });
  }

  ngOnInit(): void {
    const bookingId = this.route.snapshot.params['id'];

    this.reservationService.getPrenotazioneById(+bookingId).subscribe(response => {
      if (response) {
        this.bookingForm.setValue({
          dataCheckIn: this.formatDateForInput(response.dataCheckIn),
          dataCheckOut: this.formatDateForInput(response.dataCheckOut),
          stanzaId: response.stanza.id
        });

        if (response.stanza && response.stanza.hotel) {
          this.loadRooms(response.stanza.hotel.id);
        } else {
          console.error('Error: booking.stanza or booking.stanza.hotel is undefined!');
        }
      }
    });
  }

  loadRooms(hotelId: number): void {
    this.roomService.getRoomsByHotelId(hotelId).subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  formatDateForInput(date: any): string {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  goBack(): void {
    this.location.back();
  }

  updateBooking(): void {
    const updateData = {
      dataCheckIn: this.bookingForm.get('dataCheckIn')?.value,
dataCheckOut: this.bookingForm.get('dataCheckOut')?.value,
stanzaId: this.bookingForm.get('stanzaId')?.value,
utenteId: this.bookingForm.get('utenteId')?.value
    };

    this.reservationService.updatePrenotazione(this.route.snapshot.params['id'], updateData)
    .subscribe({
        next: (response) => {
            alert('Prenotazione effettuata con successo');
            this.router.navigate(['/admin/users']);
        },
        error: (error) => {
            alert('Si è effettuato un errore con la modifica della prenotazione');
        }
    });

  }
  formatDateForDisplay(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


parseDateFromDisplay(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(d => parseInt(d, 10));
  return new Date(year, month - 1, day);
}

  cancel(): void {
    this.router.navigate(['/admin/user/list']);
  }
}
