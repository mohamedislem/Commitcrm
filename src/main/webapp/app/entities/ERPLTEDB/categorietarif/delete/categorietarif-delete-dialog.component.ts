import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategorietarif } from '../categorietarif.model';
import { CategorietarifService } from '../service/categorietarif.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './categorietarif-delete-dialog.component.html',
})
export class CategorietarifDeleteDialogComponent {
  categorietarif?: ICategorietarif;

  constructor(protected categorietarifService: CategorietarifService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.categorietarifService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
