import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  utente: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.utente = this.authService.getUserDetails()?.user;
  }

  logout() {
    this.authService.logout();
  }
}
