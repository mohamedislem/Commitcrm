import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ModeregComponent } from './list/modereg.component';
import { ModeregDetailComponent } from './detail/modereg-detail.component';
import { ModeregUpdateComponent } from './update/modereg-update.component';
import { ModeregDeleteDialogComponent } from './delete/modereg-delete-dialog.component';
import { ModeregRoutingModule } from './route/modereg-routing.module';

@NgModule({
  imports: [SharedModule, ModeregRoutingModule],
  declarations: [ModeregComponent, ModeregDetailComponent, ModeregUpdateComponent, ModeregDeleteDialogComponent],
})
export class ErpltedbModeregModule {}
