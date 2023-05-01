import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ModeregFormService, ModeregFormGroup } from './modereg-form.service';
import { IModereg } from '../modereg.model';
import { ModeregService } from '../service/modereg.service';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

@Component({
  selector: 'jhi-modereg-update',
  templateUrl: './modereg-update.component.html',
})
export class ModeregUpdateComponent implements OnInit {
  isSaving = false;
  modereg: IModereg | null = null;

  societesSharedCollection: ISociete[] = [];

  editForm: ModeregFormGroup = this.moderegFormService.createModeregFormGroup();

  constructor(
    protected moderegService: ModeregService,
    protected moderegFormService: ModeregFormService,
    protected societeService: SocieteService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSociete = (o1: ISociete | null, o2: ISociete | null): boolean => this.societeService.compareSociete(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modereg }) => {
      this.modereg = modereg;
      if (modereg) {
        this.updateForm(modereg);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const modereg = this.moderegFormService.getModereg(this.editForm);
    if (modereg.id !== null) {
      this.subscribeToSaveResponse(this.moderegService.update(modereg));
    } else {
      this.subscribeToSaveResponse(this.moderegService.create(modereg));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModereg>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(modereg: IModereg): void {
    this.modereg = modereg;
    this.moderegFormService.resetForm(this.editForm, modereg);

    this.societesSharedCollection = this.societeService.addSocieteToCollectionIfMissing<ISociete>(
      this.societesSharedCollection,
      modereg.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISociete[]>) => res.body ?? []))
      .pipe(map((societes: ISociete[]) => this.societeService.addSocieteToCollectionIfMissing<ISociete>(societes, this.modereg?.societe)))
      .subscribe((societes: ISociete[]) => (this.societesSharedCollection = societes));
  }
}
