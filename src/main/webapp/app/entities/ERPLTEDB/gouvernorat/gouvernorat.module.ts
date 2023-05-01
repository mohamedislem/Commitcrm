import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GouvernoratComponent } from './list/gouvernorat.component';
import { GouvernoratDetailComponent } from './detail/gouvernorat-detail.component';
import { GouvernoratUpdateComponent } from './update/gouvernorat-update.component';
import { GouvernoratDeleteDialogComponent } from './delete/gouvernorat-delete-dialog.component';
import { GouvernoratRoutingModule } from './route/gouvernorat-routing.module';

@NgModule({
  imports: [SharedModule, GouvernoratRoutingModule],
  declarations: [GouvernoratComponent, GouvernoratDetailComponent, GouvernoratUpdateComponent, GouvernoratDeleteDialogComponent],
})
export class ErpltedbGouvernoratModule {}
