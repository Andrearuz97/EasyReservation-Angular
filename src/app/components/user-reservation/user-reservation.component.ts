import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/auth/auth.service';
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
    private authService: AuthService
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
}
