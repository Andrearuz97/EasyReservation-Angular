import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.scss']
})
export class AdminUserDetailComponent implements OnInit {
  userId!: string;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.fetchUserDetails();
  }


  fetchUserDetails(): void {
    this.authService.getUserDetailsById(this.userId)
      .subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
  }

}
