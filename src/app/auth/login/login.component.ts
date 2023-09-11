import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public email: string = '';
  public password: string = '';
  public statusMessage: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (data) => {
        console.log(data);
        this.statusMessage = 'Login effettuato con successo!';
      },
      (error) => {
        console.error(error);
        this.statusMessage = 'Login fallito.';
      }
    );
  }
}

