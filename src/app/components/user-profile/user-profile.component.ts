import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  utente: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.utente = this.authService.getUserDetails()?.user;
  }
}

