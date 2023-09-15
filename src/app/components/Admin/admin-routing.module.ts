import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHotelListComponent } from './hotel-management/admin-hotel-list/admin-hotel-list.component';
import { AdminHotelEditComponent } from './hotel-management/admin-hotel-edit/admin-hotel-edit.component';
import { AdminHotelDetailComponent } from './hotel-management/admin-hotel-detail/admin-hotel-detail.component';
import { OverviewComponent } from './admin-dashboard/overview/overview.component';

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent, children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'hotels', component: AdminHotelListComponent },
      { path: 'hotels/edit/:id', component: AdminHotelEditComponent },
      { path: 'hotels/:id', component: AdminHotelDetailComponent },
      // ... altre rotte admin ...
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
