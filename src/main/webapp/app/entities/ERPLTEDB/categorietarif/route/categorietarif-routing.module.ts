import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CategorietarifComponent } from '../list/categorietarif.component';
import { CategorietarifDetailComponent } from '../detail/categorietarif-detail.component';
import { CategorietarifUpdateComponent } from '../update/categorietarif-update.component';
import { CategorietarifRoutingResolveService } from './categorietarif-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const categorietarifRoute: Routes = [
  {
    path: '',
    component: CategorietarifComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CategorietarifDetailComponent,
    resolve: {
      categorietarif: CategorietarifRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CategorietarifUpdateComponent,
    resolve: {
      categorietarif: CategorietarifRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CategorietarifUpdateComponent,
    resolve: {
      categorietarif: CategorietarifRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(categorietarifRoute)],
  exports: [RouterModule],
})
export class CategorietarifRoutingModule {}
