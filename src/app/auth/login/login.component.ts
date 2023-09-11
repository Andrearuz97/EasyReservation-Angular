import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    public statusMessage: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    login(form: NgForm) {
        this.authService.login(form.value).subscribe(
            () => {
                this.statusMessage = 'Login effettuato con successo!';
                this.router.navigate(['/']);
            },
            (error) => {
                console.error(error);
                this.statusMessage = 'Login fallito.';
                this.router.navigate(['/login']);
            }
        );
    }
}

