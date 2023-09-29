import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation.interface';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.scss']
})
export class UserReservationComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserReservations();
  }

  loadUserReservations(): void {
    const userId = this.authService.currentUserId();
    if (userId) {
      this.reservationService.getPrenotazioniByUserId(userId)
        .subscribe({
          next: (data: Reservation[]) => {
            this.reservations = data;
          },
          error: (error) => {
            console.error('Errore nel caricamento delle prenotazioni:', error);
          }
        });
    }
  }

  editReservation(reservationId: number) {
    this.router.navigate(['/edit-reservation', reservationId]);
  }

  deleteReservation(reservationId: number): void {
    if (confirm('Sei sicuro di voler cancellare questa prenotazione?')) {
      this.reservationService.deletePrenotazione(reservationId)
        .subscribe({
          next: () => {
            alert('Prenotazione cancellata con successo!');
            this.reservations = this.reservations.filter(r => r.id !== reservationId);
          },
          error: error => {
            alert('Errore durante la cancellazione della prenotazione!');
            console.error('Errore:', error);
          }
        });
    }
  }
  calculateTotalPrice(reservation: Reservation): number {
    const checkInDate = new Date(reservation.dataCheckIn);
    const checkOutDate = new Date(reservation.dataCheckOut);
    const daysBetween = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
    return daysBetween * reservation.stanza.prezzo;
  }


}
