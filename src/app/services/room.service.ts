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


  getRoomByHotelAndRoomId(hotelId: number, roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}stanze/hotel/${hotelId}/${roomId}`);
}



  getRoomsByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}stanze/hotel/${hotelId}`);
  }


  addRoomToHotel(hotelId: number, room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}stanze/hotel/${hotelId}`, room);
  }

  updateRoomInHotel(hotelId: number, roomId: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}stanze/hotel/${hotelId}/${roomId}`, room);
  }

  deleteRoomFromHotel(hotelId: number, roomId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}stanze/hotel/${hotelId}/${roomId}`);
  }

}
