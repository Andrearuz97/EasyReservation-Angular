import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.interface';
import { Room } from '../models/room.interface';
import { tap, catchError, throwError } from 'rxjs';

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
    console.log("Fetching reservations for user:", userId);
    return this.http.get<Reservation[]>(`${this.baseUrl}prenotazioni/user/${userId}`).pipe(
      tap(response => {
          console.log('Reservations response:', response);
      }),
      catchError(err => {
          console.error('Error in getPrenotazioniByUserId:', err);
          return throwError(err);
      })
    );
}

  deletePrenotazione(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}prenotazioni/${id}`);
  }

  updatePrenotazione(id: number, data: any): Observable<any> {
  return this.http.put(`${this.baseUrl}prenotazioni/${id}`, data);
  }

  getAvailableRoomsByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}stanze/hotel/${hotelId}`);
  }
}
