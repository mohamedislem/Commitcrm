import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CategorietarifComponent } from './list/categorietarif.component';
import { CategorietarifDetailComponent } from './detail/categorietarif-detail.component';
import { CategorietarifUpdateComponent } from './update/categorietarif-update.component';
import { CategorietarifDeleteDialogComponent } from './delete/categorietarif-delete-dialog.component';
import { CategorietarifRoutingModule } from './route/categorietarif-routing.module';

@NgModule({
  imports: [SharedModule, CategorietarifRoutingModule],
  declarations: [
    CategorietarifComponent,
    CategorietarifDetailComponent,
    CategorietarifUpdateComponent,
    CategorietarifDeleteDialogComponent,
  ],
})
export class ErpltedbCategorietarifModule {}
