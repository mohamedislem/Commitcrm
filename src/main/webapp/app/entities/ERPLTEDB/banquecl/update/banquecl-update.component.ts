import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { BanqueclFormService, BanqueclFormGroup } from './banquecl-form.service';
import { IBanquecl } from '../banquecl.model';
import { BanqueclService } from '../service/banquecl.service';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

@Component({
  selector: 'jhi-banquecl-update',
  templateUrl: './banquecl-update.component.html',
})
export class BanqueclUpdateComponent implements OnInit {
  isSaving = false;
  banquecl: IBanquecl | null = null;
  ShowMe:boolean=false;
  societesSharedCollection: ISociete[] = [];

  editForm: BanqueclFormGroup = this.banqueclFormService.createBanqueclFormGroup();

  constructor(
    protected banqueclService: BanqueclService,
    protected banqueclFormService: BanqueclFormService,
    protected societeService: SocieteService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSociete = (o1: ISociete | null, o2: ISociete | null): boolean => this.societeService.compareSociete(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ banquecl }) => {
      this.banquecl = banquecl;
      if (banquecl) {
        this.updateForm(banquecl);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const banquecl = this.banqueclFormService.getBanquecl(this.editForm);
    if (banquecl.id !== null) {
      this.subscribeToSaveResponse(this.banqueclService.update(banquecl));
    } else {
      this.subscribeToSaveResponse(this.banqueclService.create(banquecl));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBanquecl>>): void {
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

  protected updateForm(banquecl: IBanquecl): void {
    this.banquecl = banquecl;
    this.banqueclFormService.resetForm(this.editForm, banquecl);

    this.societesSharedCollection = this.societeService.addSocieteToCollectionIfMissing<ISociete>(
      this.societesSharedCollection,
      banquecl.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISociete[]>) => res.body ?? []))
      .pipe(map((societes: ISociete[]) => this.societeService.addSocieteToCollectionIfMissing<ISociete>(societes, this.banquecl?.societe)))
      .subscribe((societes: ISociete[]) => (this.societesSharedCollection = societes));
  }
}
