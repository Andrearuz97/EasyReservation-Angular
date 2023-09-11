import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  private authSubj = new BehaviorSubject<null | Auth>(null);
  user$ = this.authSubj.asObservable();
  timeOut: any;

  constructor(private http: HttpClient, private router: Router) {
    this.restore();
  }

  login(data: {email: string, password: string}) {
    return this.http.post<Auth>(`${this.baseURL}auth/login`, data).pipe(
      tap((data) => {
        this.authSubj.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.autoLogout(data);
      })
    );
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['auth/login']);
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }

  autoLogout(data: Auth) {
    const scadenza = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
    const tempoScadenza = scadenza.getTime() - new Date().getTime();
    this.timeOut = setTimeout(() => {
      this.logout();
    }, tempoScadenza);
  }

  restore() {
    const utenteLoggato = localStorage.getItem('user');
    if (!utenteLoggato) {
      return;
    }
    const datiUtente: Auth = JSON.parse(utenteLoggato);
    if (this.jwtHelper.isTokenExpired(datiUtente.accessToken)) {
      localStorage.removeItem('user');
      return;
    }
    this.authSubj.next(datiUtente);
    this.autoLogout(datiUtente);
  }

  register(data: {
    name: string,
    surname: string,
    email: string,
    password: string,
  }) {
    return this.http.post(`${this.baseURL}auth/register`, data);
  }

  getUserDetails(): Auth | null {
    return this.authSubj.getValue();
  }
}

