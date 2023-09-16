import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  isUserLoggedIn(): boolean {
    return this.authService.getUserDetails() !== null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
}


}
