import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SecteurFormService, SecteurFormGroup } from './secteur-form.service';
import { ISecteur } from '../secteur.model';
import { SecteurService } from '../service/secteur.service';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

@Component({
  selector: 'jhi-secteur-update',
  templateUrl: './secteur-update.component.html',
})
export class SecteurUpdateComponent implements OnInit {
  isSaving = false;
  secteur: ISecteur | null = null;

  societesSharedCollection: ISociete[] = [];

  editForm: SecteurFormGroup = this.secteurFormService.createSecteurFormGroup();

  constructor(
    protected secteurService: SecteurService,
    protected secteurFormService: SecteurFormService,
    protected societeService: SocieteService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSociete = (o1: ISociete | null, o2: ISociete | null): boolean => this.societeService.compareSociete(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ secteur }) => {
      this.secteur = secteur;
      if (secteur) {
        this.updateForm(secteur);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const secteur = this.secteurFormService.getSecteur(this.editForm);
    if (secteur.id !== null) {
      this.subscribeToSaveResponse(this.secteurService.update(secteur));
    } else {
      this.subscribeToSaveResponse(this.secteurService.create(secteur));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISecteur>>): void {
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

  protected updateForm(secteur: ISecteur): void {
    this.secteur = secteur;
    this.secteurFormService.resetForm(this.editForm, secteur);

    this.societesSharedCollection = this.societeService.addSocieteToCollectionIfMissing<ISociete>(
      this.societesSharedCollection,
      secteur.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISociete[]>) => res.body ?? []))
      .pipe(map((societes: ISociete[]) => this.societeService.addSocieteToCollectionIfMissing<ISociete>(societes, this.secteur?.societe)))
      .subscribe((societes: ISociete[]) => (this.societesSharedCollection = societes));
  }
}
