import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/models/reservation.interface';
import { User } from 'src/app/models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
  allUsers: User[] = [];
  selectedUserId: string = '';
  selectedUserName: string = '';
  selectedUserBookings: Reservation[] = [];

  constructor(private reservationService: ReservationService, private authService: AuthService, private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.authService.getUsers().subscribe(users => {
      if (users.some(user => !user.idUser)) {
        console.error("Some users don't have IDs!", users.filter(user => !user.idUser));
      }
      this.allUsers = users;
    });
  }

  selectUser(userId: string): void {
      if (!userId) {
          console.error('User ID is not defined!');
          return;
      }
      this.selectedUserId = userId;

      this.authService.getUserDetailsById(userId).pipe(
        switchMap(userDetails => {
          this.selectedUserName = `${userDetails.name} ${userDetails.surname}`;
          return this.reservationService.getPrenotazioniByUserId(userId);
        })
      ).subscribe({
        next: data => {
          this.selectedUserBookings = data;
        },
        error: error => {
          if (error.error && error.error.message === 'User not found') {
            console.error('Error fetching user details:', error);
          } else {
            console.error('Error fetching user bookings:', error);
          }
        }
      });
  }

  editBooking(reservationId: number, hotelId: number): void {
    this.router.navigate(['/admin/users/edit', reservationId], { queryParams: { hotelId: hotelId } });
  }

  deleteBooking(bookingId: number): void {
    const confirmDelete = confirm("Sei sicuro di voler eliminare questa prenotazione?");
    if (confirmDelete) {
      this.reservationService.deletePrenotazione(bookingId).subscribe(() => {
        this.selectedUserBookings = this.selectedUserBookings.filter(booking => booking.id !== bookingId);
        alert('Prenotazione eliminata con successo.');
      });
    }
  }

  viewUserBookings(): void {
    if (this.selectedUserId) {
        forkJoin([
            this.authService.getUserDetailsById(this.selectedUserId),
            this.reservationService.getPrenotazioniByUserId(this.selectedUserId)
        ]).subscribe({
            next: ([userDetails, bookings]) => {
                this.selectedUserName = `${userDetails.name} ${userDetails.surname}`;
                this.selectedUserBookings = bookings;
            },
            error: error => {
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
