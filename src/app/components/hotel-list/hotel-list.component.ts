import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  searchControl = new FormControl();
  autocompleteHotels: Hotel[] = [];
  noResults: boolean = false;

  constructor(private hotelService: HotelService, private router: Router) { }

  ngOnInit(): void {
    this.loadHotelsPaged();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          this.searchTerm = query;
          if (this.searchTerm) {
            return this.hotelService.ricercaHotel(this.searchTerm).pipe(
              catchError(error => {
                console.error('Si è verificato un errore durante la ricerca:', error);
                return of([]);
              })
            );
          } else {
            this.loadHotelsPaged();
            return of([]);
          }
        })
      )
      .subscribe(results => {
        this.noResults = results.length === 0 && this.searchTerm !== '';
        this.autocompleteHotels = this.searchTerm ? results : [];
        this.hotels = this.searchTerm ? results : this.hotels;
      });
  }

  selectHotel(hotel: Hotel): void {
    this.router.navigate(['/hotel', hotel.id]);
    this.autocompleteHotels = [];
    this.searchControl.setValue('');
  }

  cercaHotel(): void {
    this.autocompleteHotels = [];
    const query = this.searchTerm;
    if (query) {
      this.hotelService.ricercaHotel(query).subscribe(
        data => {
          this.noResults = data.length === 0;
          this.hotels = data;
        },
        error => {
          console.error('Errore durante la ricerca:', error);
        }
      );
    } else {
      this.loadHotelsPaged();
    }
  }

  loadHotelsPaged(): void {
    this.hotelService.getAllHotelsPaged(this.currentPage, this.pageSize).subscribe(
      response => {
        this.hotels = response.content;
        this.totalPages = response.totalPages;
      },
      error => {
        console.error('Errore nel caricamento degli hotel:', error);
      }
    );
  }

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.loadHotelsPaged();
    }
  }
}
