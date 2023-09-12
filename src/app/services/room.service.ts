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
    return this.http.get<Room[]>(`${this.baseUrl}stanze/hotel`);
  }

  getRoomByHotelAndRoomId(hotelId: number, roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}stanze/hotel/${hotelId}/${roomId}`);
  }



  getRoomsByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}stanze/hotel/${hotelId}`);
}



  // Altri metodi CRUD come addRoom, updateRoom, deleteRoom.
}
