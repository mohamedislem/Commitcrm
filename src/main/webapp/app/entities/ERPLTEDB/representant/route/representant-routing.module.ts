import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RepresentantComponent } from '../list/representant.component';
import { RepresentantDetailComponent } from '../detail/representant-detail.component';
import { RepresentantUpdateComponent } from '../update/representant-update.component';
import { RepresentantRoutingResolveService } from './representant-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const representantRoute: Routes = [
  {
    path: '',
    component: RepresentantComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RepresentantDetailComponent,
    resolve: {
      representant: RepresentantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RepresentantUpdateComponent,
    resolve: {
      representant: RepresentantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RepresentantUpdateComponent,
    resolve: {
      representant: RepresentantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(representantRoute)],
  exports: [RouterModule],
})
export class RepresentantRoutingModule {}
