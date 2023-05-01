import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IModereg } from '../modereg.model';
import { ModeregService } from '../service/modereg.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './modereg-delete-dialog.component.html',
})
export class ModeregDeleteDialogComponent {
  modereg?: IModereg;

  constructor(protected moderegService: ModeregService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.moderegService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
