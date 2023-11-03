import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  ricercaHotel(searchTerm: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}hotel/search`, {
      params: {
        query: searchTerm
      }
    });
  }
  autocompleteSearch(query: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/autocomplete`, { params: { query } });
  }
  getAllHotelsPaged(page: number = 0, size: number = 2): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}hotel/paged?page=${page}&size=${size}`);
  }


  getHotels(): Observable<any> {
    return this.http.get(`${this.baseUrl}hotel`);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}hotel/${id}`);
  }

  addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.baseUrl}hotel`, hotel);
  }

  updateHotel(id: number, hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.baseUrl}hotel/${id}`, hotel);
  }

  deleteHotel(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}hotel/${id}`);
  }

}
