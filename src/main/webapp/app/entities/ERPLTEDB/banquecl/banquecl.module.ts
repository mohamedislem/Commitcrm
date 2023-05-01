import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BanqueclComponent } from './list/banquecl.component';
import { BanqueclDetailComponent } from './detail/banquecl-detail.component';
import { BanqueclUpdateComponent } from './update/banquecl-update.component';
import { BanqueclDeleteDialogComponent } from './delete/banquecl-delete-dialog.component';
import { BanqueclRoutingModule } from './route/banquecl-routing.module';

@NgModule({
  imports: [SharedModule, BanqueclRoutingModule],
  declarations: [BanqueclComponent, BanqueclDetailComponent, BanqueclUpdateComponent, BanqueclDeleteDialogComponent],
})
export class ErpltedbBanqueclModule {}
