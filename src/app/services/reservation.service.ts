import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getPrenotazioneById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}prenotazioni/${id}`);
  }

  createPrenotazione(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}prenotazioni/prenota`, data);
  }

  getPrenotazioniByUserId(userId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}prenotazioni/user/${userId}`);
  }
}
