import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelManagementComponent } from './hotel-management/hotel-management.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OverviewComponent } from './admin-dashboard/overview/overview.component';
import { AdminHotelListComponent } from './hotel-management/admin-hotel-list/admin-hotel-list.component';
import { AdminHotelEditComponent } from './hotel-management/admin-hotel-edit/admin-hotel-edit.component';
import { AdminHotelDetailComponent } from './hotel-management/admin-hotel-detail/admin-hotel-detail.component';
import { AdminRoomListComponent } from './room-management/admin-room-list/admin-room-list.component';
import { AdminRoomEditComponent } from './room-management/admin-room-edit/admin-room-edit.component';
import { AdminRoomDetailComponent } from './room-management/admin-room-detail/admin-room-detail.component';
import { AdminUserListComponent } from './user-management/admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './user-management/admin-user-edit/admin-user-edit.component';
import { AdminUserDetailComponent } from './user-management/admin-user-detail/admin-user-detail.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    HotelManagementComponent,
    RoomManagementComponent,
    UserManagementComponent,
    AdminDashboardComponent,
    OverviewComponent,
    AdminHotelListComponent,
    AdminHotelEditComponent,
    AdminHotelDetailComponent,
    AdminRoomListComponent,
    AdminRoomEditComponent,
    AdminRoomDetailComponent,
    AdminUserListComponent,
    AdminUserEditComponent,
    AdminUserDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
