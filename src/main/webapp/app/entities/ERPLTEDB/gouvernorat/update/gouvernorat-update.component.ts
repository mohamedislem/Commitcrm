import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { GouvernoratFormService, GouvernoratFormGroup } from './gouvernorat-form.service';
import { IGouvernorat } from '../gouvernorat.model';
import { GouvernoratService } from '../service/gouvernorat.service';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

@Component({
  selector: 'jhi-gouvernorat-update',
  templateUrl: './gouvernorat-update.component.html',
})
export class GouvernoratUpdateComponent implements OnInit {
  isSaving = false;
  gouvernorat: IGouvernorat | null = null;
  ShowMe:boolean=false;
  societesSharedCollection: ISociete[] = [];

  editForm: GouvernoratFormGroup = this.gouvernoratFormService.createGouvernoratFormGroup();

  constructor(
    protected gouvernoratService: GouvernoratService,
    protected gouvernoratFormService: GouvernoratFormService,
    protected societeService: SocieteService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSociete = (o1: ISociete | null, o2: ISociete | null): boolean => this.societeService.compareSociete(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gouvernorat }) => {
      this.gouvernorat = gouvernorat;
      if (gouvernorat) {
        this.updateForm(gouvernorat);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gouvernorat = this.gouvernoratFormService.getGouvernorat(this.editForm);
    if (gouvernorat.id !== null) {
      this.subscribeToSaveResponse(this.gouvernoratService.update(gouvernorat));
    } else {
      this.subscribeToSaveResponse(this.gouvernoratService.create(gouvernorat));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGouvernorat>>): void {
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

  protected updateForm(gouvernorat: IGouvernorat): void {
    this.gouvernorat = gouvernorat;
    this.gouvernoratFormService.resetForm(this.editForm, gouvernorat);

    this.societesSharedCollection = this.societeService.addSocieteToCollectionIfMissing<ISociete>(
      this.societesSharedCollection,
      gouvernorat.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISociete[]>) => res.body ?? []))
      .pipe(
        map((societes: ISociete[]) => this.societeService.addSocieteToCollectionIfMissing<ISociete>(societes, this.gouvernorat?.societe))
      )
      .subscribe((societes: ISociete[]) => (this.societesSharedCollection = societes));
  }
}
