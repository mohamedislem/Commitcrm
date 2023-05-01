import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { RepresentantFormService, RepresentantFormGroup } from './representant-form.service';
import { IRepresentant } from '../representant.model';
import { RepresentantService } from '../service/representant.service';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';
import { modevisite } from 'app/entities/enumerations/modevisite.model';

@Component({
  selector: 'jhi-representant-update',
  templateUrl: './representant-update.component.html',
})
export class RepresentantUpdateComponent implements OnInit {
  isSaving = false;
  representant: IRepresentant | null = null;
  modevisiteValues = Object.keys(modevisite);

  societesSharedCollection: ISociete[] = [];

  editForm: RepresentantFormGroup = this.representantFormService.createRepresentantFormGroup();

  constructor(
    protected representantService: RepresentantService,
    protected representantFormService: RepresentantFormService,
    protected societeService: SocieteService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSociete = (o1: ISociete | null, o2: ISociete | null): boolean => this.societeService.compareSociete(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ representant }) => {
      this.representant = representant;
      if (representant) {
        this.updateForm(representant);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const representant = this.representantFormService.getRepresentant(this.editForm);
    if (representant.id !== null) {
      this.subscribeToSaveResponse(this.representantService.update(representant));
    } else {
      this.subscribeToSaveResponse(this.representantService.create(representant));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepresentant>>): void {
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

  protected updateForm(representant: IRepresentant): void {
    this.representant = representant;
    this.representantFormService.resetForm(this.editForm, representant);

    this.societesSharedCollection = this.societeService.addSocieteToCollectionIfMissing<ISociete>(
      this.societesSharedCollection,
      representant.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISociete[]>) => res.body ?? []))
      .pipe(
        map((societes: ISociete[]) => this.societeService.addSocieteToCollectionIfMissing<ISociete>(societes, this.representant?.societe))
      )
      .subscribe((societes: ISociete[]) => (this.societesSharedCollection = societes));
  }
}
