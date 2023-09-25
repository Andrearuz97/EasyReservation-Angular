import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nome!: string;
  cognome!: string;
  email!: string;
  password!: string;
  telefono!: string;
  citta!:string;
  indirizzo!: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(form: NgForm) {
    const userData = {
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      password: form.value.password,
      telefono: form.value.telefono,
      citta: form.value.citta,
      indirizzo: form.value.indirizzo
    };

    this.authService.register(userData).subscribe({
      next: () => {
        alert('Registrazione effettuata con successo!');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        alert('Questa e-mail risulta già utilizzata');
        console.error(error);
        if (error.status == 400) {
          this.router.navigate(['/register']);
        }
      }
    });


  }
}
