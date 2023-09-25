import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.scss']
})
export class AdminUserDetailComponent implements OnInit {
  userId!: string;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.fetchUserDetails();
  }


  fetchUserDetails(): void {
    this.authService.getUserDetailsById(this.userId)
      .subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
  }
  deleteUser(): void {
    const decision = confirm("Sei sicuro di voler eliminare l'utente selezionato?");
    if (decision) {
        this.authService.deleteUserById(this.userId).subscribe({
            next: () => {
                console.log("Utente eliminato con successo");
                alert("Utente eliminato con successo");
                this.router.navigate(['/admin/users']);
            },
            error: error => {
                console.error('Errore durante l\'eliminazione dell\'utente:', error);
                alert("Errore durante l'eliminazione dell'utente.");
            }
        });
    }
}


editing = false;

updateUser(): void {
  this.authService.updateUserById(this.userId, this.user).subscribe({
    next: () => {
      this.editing = false;
      console.log("Utente aggiornato con successo");
      alert("Utente aggiornato con successo");
    },
    error: error => {
      console.error('Errore durante l\'aggiornamento dell\'utente:', error);
      alert("Errore durante l'aggiornamento dell'utente.");
    }
  });
}




}
