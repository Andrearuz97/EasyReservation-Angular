import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router'; // Aggiunto
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
    private router: Router  // Aggiunto
  ) {}

  ngOnInit(): void {
    this.loadUserReservations();
  }

  loadUserReservations(): void {
    const userId = this.authService.currentUserId();
    if (userId) {
      this.reservationService.getPrenotazioniByUserId(userId)
        .subscribe(data => {
          this.reservations = data;
        }, error => {
          console.error('Errore nel caricamento delle prenotazioni:', error);
        });
    }
  }

  editReservation(reservationId: number) {
    this.router.navigate(['/edit-reservation', reservationId]);
  }

  deleteReservation(reservationId: number) {
    if (confirm('Sei sicuro di voler cancellare questa prenotazione?')) {
      this.reservationService.deletePrenotazione(reservationId).subscribe(() => {
        alert('Prenotazione cancellata con successo!');
        this.reservations = this.reservations.filter(r => r.id !== reservationId);
      }, error => {
        alert('Errore durante la cancellazione della prenotazione!');
      });
    }
  }

}
