import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { RegionFormService, RegionFormGroup } from './region-form.service';
import { IRegion } from '../region.model';
import { RegionService } from '../service/region.service';
import { IGouvernorat } from 'app/entities/ERPLTEDB/gouvernorat/gouvernorat.model';
import { GouvernoratService } from 'app/entities/ERPLTEDB/gouvernorat/service/gouvernorat.service';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

@Component({
  selector: 'jhi-region-update',
  templateUrl: './region-update.component.html',
})
export class RegionUpdateComponent implements OnInit {
  isSaving = false;
  region: IRegion | null = null;

  gouvernoratsSharedCollection: IGouvernorat[] = [];
  societesSharedCollection: ISociete[] = [];

  editForm: RegionFormGroup = this.regionFormService.createRegionFormGroup();

  constructor(
    protected regionService: RegionService,
    protected regionFormService: RegionFormService,
    protected gouvernoratService: GouvernoratService,
    protected societeService: SocieteService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareGouvernorat = (o1: IGouvernorat | null, o2: IGouvernorat | null): boolean => this.gouvernoratService.compareGouvernorat(o1, o2);

  compareSociete = (o1: ISociete | null, o2: ISociete | null): boolean => this.societeService.compareSociete(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => {
      this.region = region;
      if (region) {
        this.updateForm(region);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const region = this.regionFormService.getRegion(this.editForm);
    if (region.id !== null) {
      this.subscribeToSaveResponse(this.regionService.update(region));
    } else {
      this.subscribeToSaveResponse(this.regionService.create(region));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegion>>): void {
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

  protected updateForm(region: IRegion): void {
    this.region = region;
    this.regionFormService.resetForm(this.editForm, region);

    this.gouvernoratsSharedCollection = this.gouvernoratService.addGouvernoratToCollectionIfMissing<IGouvernorat>(
      this.gouvernoratsSharedCollection,
      region.gouvernorat
    );
    this.societesSharedCollection = this.societeService.addSocieteToCollectionIfMissing<ISociete>(
      this.societesSharedCollection,
      region.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.gouvernoratService
      .query()
      .pipe(map((res: HttpResponse<IGouvernorat[]>) => res.body ?? []))
      .pipe(
        map((gouvernorats: IGouvernorat[]) =>
          this.gouvernoratService.addGouvernoratToCollectionIfMissing<IGouvernorat>(gouvernorats, this.region?.gouvernorat)
        )
      )
      .subscribe((gouvernorats: IGouvernorat[]) => (this.gouvernoratsSharedCollection = gouvernorats));

    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISociete[]>) => res.body ?? []))
      .pipe(map((societes: ISociete[]) => this.societeService.addSocieteToCollectionIfMissing<ISociete>(societes, this.region?.societe)))
      .subscribe((societes: ISociete[]) => (this.societesSharedCollection = societes));
  }
}
