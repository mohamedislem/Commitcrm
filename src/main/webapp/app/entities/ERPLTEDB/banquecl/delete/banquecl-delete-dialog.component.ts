import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBanquecl } from '../banquecl.model';
import { BanqueclService } from '../service/banquecl.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './banquecl-delete-dialog.component.html',
})
export class BanqueclDeleteDialogComponent {
  banquecl?: IBanquecl;

  constructor(protected banqueclService: BanqueclService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.banqueclService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
