import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ModeregComponent } from '../list/modereg.component';
import { ModeregDetailComponent } from '../detail/modereg-detail.component';
import { ModeregUpdateComponent } from '../update/modereg-update.component';
import { ModeregRoutingResolveService } from './modereg-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const moderegRoute: Routes = [
  {
    path: '',
    component: ModeregComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ModeregDetailComponent,
    resolve: {
      modereg: ModeregRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ModeregUpdateComponent,
    resolve: {
      modereg: ModeregRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ModeregUpdateComponent,
    resolve: {
      modereg: ModeregRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(moderegRoute)],
  exports: [RouterModule],
})
export class ModeregRoutingModule {}
