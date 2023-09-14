import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/reservation.interface';
import { Room } from 'src/app/models/room.interface';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {
  editForm: FormGroup;
  availableRooms: Room[] = [];
  reservation: Reservation | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService
  ) {
    this.editForm = this.fb.group({
      dataCheckIn: [''],
      dataCheckOut: [''],
      stanzaId: ['']
    });
  }

  ngOnInit(): void {
    const reservationId = this.route.snapshot.paramMap.get('id');
    if (reservationId) {
      this.reservationService.getPrenotazioneById(+reservationId).subscribe(reservation => {
        this.reservation = reservation;
        this.editForm.setValue({
          dataCheckIn: reservation.dataCheckIn,
          dataCheckOut: reservation.dataCheckOut,
          stanzaId: reservation.stanza.id
        });
        this.loadAvailableRooms(reservation.stanza.hotel.id);
      });
    }
  }

  loadAvailableRooms(hotelId: number): void {
    this.reservationService.getAvailableRoomsByHotelId(hotelId).subscribe(rooms => {
      this.availableRooms = rooms;
    }, error => {
      console.error('Errore nel caricamento delle stanze:', error);
    });
  }

  onSubmit() {
    const reservationId = this.route.snapshot.paramMap.get('id');
    if (reservationId) {
      this.reservationService.updatePrenotazione(+reservationId, this.editForm.value).subscribe(() => {
        alert('Prenotazione modificata con successo!');
        this.router.navigate(['/my-reservations']);
      }, error => {
        alert('Errore nella modifica della prenotazione.');
      });
    }
  }
}
