import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RepresentantComponent } from './list/representant.component';
import { RepresentantDetailComponent } from './detail/representant-detail.component';
import { RepresentantUpdateComponent } from './update/representant-update.component';
import { RepresentantDeleteDialogComponent } from './delete/representant-delete-dialog.component';
import { RepresentantRoutingModule } from './route/representant-routing.module';

@NgModule({
  imports: [SharedModule, RepresentantRoutingModule],
  declarations: [RepresentantComponent, RepresentantDetailComponent, RepresentantUpdateComponent, RepresentantDeleteDialogComponent],
})
export class ErpltedbRepresentantModule {}
