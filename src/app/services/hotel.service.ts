import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHotels(): Observable<any> {
    return this.http.get(`${this.baseUrl}hotel`);
  }
}
