import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Room } from '../models/room.interface';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}room`);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}room/${id}`);
  }
  getRoomsByHotelId(hotelId: number): Observable<Room[]> {
    // Implementa la logica per ottenere le stanze in base all'ID dell'hotel
    // Esempio:
    return this.http.get<Room[]>(`${this.baseUrl}/rooms?hotelId=${hotelId}`);
 }



  // Altri metodi CRUD come addRoom, updateRoom, deleteRoom.
}
