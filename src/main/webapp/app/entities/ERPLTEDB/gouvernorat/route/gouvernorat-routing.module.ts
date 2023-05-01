import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GouvernoratComponent } from '../list/gouvernorat.component';
import { GouvernoratDetailComponent } from '../detail/gouvernorat-detail.component';
import { GouvernoratUpdateComponent } from '../update/gouvernorat-update.component';
import { GouvernoratRoutingResolveService } from './gouvernorat-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const gouvernoratRoute: Routes = [
  {
    path: '',
    component: GouvernoratComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GouvernoratDetailComponent,
    resolve: {
      gouvernorat: GouvernoratRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GouvernoratUpdateComponent,
    resolve: {
      gouvernorat: GouvernoratRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GouvernoratUpdateComponent,
    resolve: {
      gouvernorat: GouvernoratRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(gouvernoratRoute)],
  exports: [RouterModule],
})
export class GouvernoratRoutingModule {}
