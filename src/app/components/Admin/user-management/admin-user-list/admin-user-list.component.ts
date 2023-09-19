import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/models/reservation.interface';
import { User } from 'src/app/models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


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
      console.log("Loaded Users:", users);
      if (users.some(user => !user.idUser)) {
        console.error("Some users don't have IDs!", users.filter(user => !user.idUser));
      }
      this.allUsers = users;
    });

  }

  selectUser(userId: string): void {
    console.log('Value from select:', userId);
    if (!userId) {
        console.error('User ID is not defined!');
        return;
    }
    this.selectedUserId = userId;
    this.authService.getUserDetailsById(userId).subscribe(userDetails => {
      console.log('User details received:', userDetails);
      this.selectedUserName = `${userDetails.name} ${userDetails.surname}`;
      this.reservationService.getPrenotazioniByUserId(userId).subscribe(data => {
        console.log('User bookings received:', data);
        this.selectedUserBookings = data;
      },
      error => {
          console.error('Error fetching user bookings:', error);
      });
    },
    error => {
        console.error('Error fetching user details:', error);
    });
}


editBooking(bookingId: number): void {
  this.router.navigate(['/admin/users/edit', bookingId]);
}




  deleteBooking(bookingId: number): void {
    const confirmDelete = confirm("Sei sicuro di voler eliminare questa prenotazione?");
    if (confirmDelete) {
      this.reservationService.deletePrenotazione(bookingId).subscribe(() => {
        this.selectedUserBookings = this.selectedUserBookings.filter(booking => booking.id !== bookingId);
      });
    }
  }
  viewUserBookings(): void {
    if (this.selectedUserId) {
      this.authService.getUserDetailsById(this.selectedUserId).subscribe(userDetails => {
        this.selectedUserName = `${userDetails.name} ${userDetails.surname}`;
      });
      this.reservationService.getPrenotazioniByUserId(this.selectedUserId).subscribe(
        data => {
          console.log('Prenotazioni ricevute:', data);
          this.selectedUserBookings = data;
        },
        error => {
          console.error('Errore nel recupero delle prenotazioni:', error);
        }
      );

    }
}

}
