import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CategorietarifFormService, CategorietarifFormGroup } from './categorietarif-form.service';
import { ICategorietarif } from '../categorietarif.model';
import { CategorietarifService } from '../service/categorietarif.service';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

@Component({
  selector: 'jhi-categorietarif-update',
  templateUrl: './categorietarif-update.component.html',
})
export class CategorietarifUpdateComponent implements OnInit {
  isSaving = false;
  categorietarif: ICategorietarif | null = null;
  ShowMe:boolean=false;
  societesSharedCollection: ISociete[] = [];

  editForm: CategorietarifFormGroup = this.categorietarifFormService.createCategorietarifFormGroup();

  constructor(
    protected categorietarifService: CategorietarifService,
    protected categorietarifFormService: CategorietarifFormService,
    protected societeService: SocieteService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSociete = (o1: ISociete | null, o2: ISociete | null): boolean => this.societeService.compareSociete(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorietarif }) => {
      this.categorietarif = categorietarif;
      if (categorietarif) {
        this.updateForm(categorietarif);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categorietarif = this.categorietarifFormService.getCategorietarif(this.editForm);
    if (categorietarif.id !== null) {
      this.subscribeToSaveResponse(this.categorietarifService.update(categorietarif));
    } else {
      this.subscribeToSaveResponse(this.categorietarifService.create(categorietarif));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategorietarif>>): void {
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

  protected updateForm(categorietarif: ICategorietarif): void {
    this.categorietarif = categorietarif;
    this.categorietarifFormService.resetForm(this.editForm, categorietarif);

    this.societesSharedCollection = this.societeService.addSocieteToCollectionIfMissing<ISociete>(
      this.societesSharedCollection,
      categorietarif.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISociete[]>) => res.body ?? []))
      .pipe(
        map((societes: ISociete[]) => this.societeService.addSocieteToCollectionIfMissing<ISociete>(societes, this.categorietarif?.societe))
      )
      .subscribe((societes: ISociete[]) => (this.societesSharedCollection = societes));
  }
}
