import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    userDetails: User | null = null;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.authService.user$.subscribe((authData) => {
            if (authData) {
                const userId = this.authService.currentUserId();
                if (userId) {
                    this.authService.getUserDetailsById(userId).subscribe(data => {
                        this.userDetails = data;
                    });
                }
            } else {
                this.userDetails = null;
            }
        });
    }

    isUserLoggedIn(): boolean {
        return this.authService.getUserDetails() !== null;
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
        alert("Disconnessione effetuata con successo!");
    }

    isAdmin(): boolean {
        return this.authService.isAdmin();
    }

    closeNavbar(): void {
        const navbar = document.getElementById('navbarNav');
        if (navbar) {
            navbar.classList.remove('show');
        }
    }
}
