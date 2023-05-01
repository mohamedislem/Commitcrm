import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BanqueclComponent } from '../list/banquecl.component';
import { BanqueclDetailComponent } from '../detail/banquecl-detail.component';
import { BanqueclUpdateComponent } from '../update/banquecl-update.component';
import { BanqueclRoutingResolveService } from './banquecl-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const banqueclRoute: Routes = [
  {
    path: '',
    component: BanqueclComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BanqueclDetailComponent,
    resolve: {
      banquecl: BanqueclRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BanqueclUpdateComponent,
    resolve: {
      banquecl: BanqueclRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BanqueclUpdateComponent,
    resolve: {
      banquecl: BanqueclRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(banqueclRoute)],
  exports: [RouterModule],
})
export class BanqueclRoutingModule {}
