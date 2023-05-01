import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGouvernorat } from '../gouvernorat.model';
import { GouvernoratService } from '../service/gouvernorat.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './gouvernorat-delete-dialog.component.html',
})
export class GouvernoratDeleteDialogComponent {
  gouvernorat?: IGouvernorat;

  constructor(protected gouvernoratService: GouvernoratService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.gouvernoratService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
