import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  utente: any;

  constructor(
    private authService: AuthService  // Usa 'private' qui
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit called");
    const tokenInfo = this.authService.getUserInfoFromToken();
    console.log("Token Info:", tokenInfo);
    if (tokenInfo && tokenInfo.sub) {
      this.authService.getUserDetailsById(tokenInfo.sub)
        .pipe(
          catchError(error => {
            console.error("Errore nel recuperare i dettagli dell'utente:", error);
            return of(null);
          })
        )
        .subscribe(userDetails => {
          if (userDetails) {
            this.utente = userDetails;
          }
        });
    }
  }
}
