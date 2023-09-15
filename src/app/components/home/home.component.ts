import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentYear: number = new Date().getFullYear();


  constructor() { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

}
