import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHotelListComponent } from './hotel-management/admin-hotel-list/admin-hotel-list.component';
import { AdminHotelEditComponent } from './hotel-management/admin-hotel-edit/admin-hotel-edit.component';
import { AdminHotelDetailComponent } from './hotel-management/admin-hotel-detail/admin-hotel-detail.component';
import { OverviewComponent } from './admin-dashboard/overview/overview.component';
import { AdminRoomDetailComponent } from './room-management/admin-room-detail/admin-room-detail.component';
import { AdminRoomListComponent } from './room-management/admin-room-list/admin-room-list.component';
import { AdminRoomEditComponent } from './room-management/admin-room-edit/admin-room-edit.component';
import { AdminUserListComponent } from './user-management/admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './user-management/admin-user-edit/admin-user-edit.component';
import { AdminUserDetailComponent } from './user-management/admin-user-detail/admin-user-detail.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'hotels', component: AdminHotelListComponent },
      { path: 'hotels/new', component: AdminHotelEditComponent },
      { path: 'hotels/edit/:id', component: AdminHotelEditComponent },
      { path: 'hotels/edit', component: AdminHotelEditComponent },
      { path: 'hotels/:id', component: AdminHotelDetailComponent },
      { path: 'hotels/:id/rooms', component: AdminRoomListComponent},
      { path: 'rooms', component: AdminRoomListComponent },
      { path: 'rooms/edit/:id', component: AdminRoomEditComponent },
      { path: 'rooms/edit/:hotelId/:roomId', component: AdminRoomEditComponent },
      { path: 'hotels/:hotelId/rooms/:id', component: AdminRoomDetailComponent },
      { path: 'users/edit/:id', component: AdminUserEditComponent },
      { path: 'users/:id', component: AdminUserDetailComponent },
      { path: 'users', component: AdminUserListComponent },

    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
