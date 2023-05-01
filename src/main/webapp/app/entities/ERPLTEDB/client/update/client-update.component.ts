import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ClientFormService, ClientFormGroup } from './client-form.service';
import { IClient } from '../client.model';
import { ClientService } from '../service/client.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';
import { IActivite } from 'app/entities/ERPLTEDB/activite/activite.model';
import { ActiviteService } from 'app/entities/ERPLTEDB/activite/service/activite.service';
import { ISecteur } from 'app/entities/ERPLTEDB/secteur/secteur.model';
import { SecteurService } from 'app/entities/ERPLTEDB/secteur/service/secteur.service';
import { IBanquecl } from 'app/entities/ERPLTEDB/banquecl/banquecl.model';
import { BanqueclService } from 'app/entities/ERPLTEDB/banquecl/service/banquecl.service';
import { IPoste } from 'app/entities/ERPLTEDB/poste/poste.model';
import { PosteService } from 'app/entities/ERPLTEDB/poste/service/poste.service';
import { IModereg } from 'app/entities/ERPLTEDB/modereg/modereg.model';
import { ModeregService } from 'app/entities/ERPLTEDB/modereg/service/modereg.service';
import { ICategorietarif } from 'app/entities/ERPLTEDB/categorietarif/categorietarif.model';
import { CategorietarifService } from 'app/entities/ERPLTEDB/categorietarif/service/categorietarif.service';
import { IGouvernorat } from 'app/entities/ERPLTEDB/gouvernorat/gouvernorat.model';
import { GouvernoratService } from 'app/entities/ERPLTEDB/gouvernorat/service/gouvernorat.service';
import { IRegion } from 'app/entities/ERPLTEDB/region/region.model';
import { RegionService } from 'app/entities/ERPLTEDB/region/service/region.service';
import { IRepresentant } from 'app/entities/ERPLTEDB/representant/representant.model';
import { RepresentantService } from 'app/entities/ERPLTEDB/representant/service/representant.service';
import { typelocal } from 'app/entities/enumerations/typelocal.model';
import { regime } from 'app/entities/enumerations/regime.model';
import { typeclient } from 'app/entities/enumerations/typeclient.model';
import { typepatante } from 'app/entities/enumerations/typepatante.model';
import { note } from 'app/entities/enumerations/note.model';

@Component({
  selector: 'jhi-client-update',
  templateUrl: './client-update.component.html',
})
export class ClientUpdateComponent implements OnInit {
  isSaving = false;
  client: IClient | null = null;
  typelocalValues = Object.keys(typelocal);
  regimeValues = Object.keys(regime);
  typeclientValues = Object.keys(typeclient);
  typepatanteValues = Object.keys(typepatante);
  noteValues = Object.keys(note);

  societesSharedCollection: ISociete[] = [];
  activitesSharedCollection: IActivite[] = [];
  secteursSharedCollection: ISecteur[] = [];
  banqueclsSharedCollection: IBanquecl[] = [];
  postesSharedCollection: IPoste[] = [];
  moderegsSharedCollection: IModereg[] = [];
  categorietarifsSharedCollection: ICategorietarif[] = [];
  gouvernoratsSharedCollection: IGouvernorat[] = [];
  regionsSharedCollection: IRegion[] = [];
  representantsSharedCollection: IRepresentant[] = [];

  editForm: ClientFormGroup = this.clientFormService.createClientFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected clientService: ClientService,
    protected clientFormService: ClientFormService,
    protected societeService: SocieteService,
    protected activiteService: ActiviteService,
    protected secteurService: SecteurService,
    protected banqueclService: BanqueclService,
    protected posteService: PosteService,
    protected moderegService: ModeregService,
    protected categorietarifService: CategorietarifService,
    protected gouvernoratService: GouvernoratService,
    protected regionService: RegionService,
    protected representantService: RepresentantService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSociete = (o1: ISociete | null, o2: ISociete | null): boolean => this.societeService.compareSociete(o1, o2);

  compareActivite = (o1: IActivite | null, o2: IActivite | null): boolean => this.activiteService.compareActivite(o1, o2);

  compareSecteur = (o1: ISecteur | null, o2: ISecteur | null): boolean => this.secteurService.compareSecteur(o1, o2);

  compareBanquecl = (o1: IBanquecl | null, o2: IBanquecl | null): boolean => this.banqueclService.compareBanquecl(o1, o2);

  comparePoste = (o1: IPoste | null, o2: IPoste | null): boolean => this.posteService.comparePoste(o1, o2);

  compareModereg = (o1: IModereg | null, o2: IModereg | null): boolean => this.moderegService.compareModereg(o1, o2);

  compareCategorietarif = (o1: ICategorietarif | null, o2: ICategorietarif | null): boolean =>
    this.categorietarifService.compareCategorietarif(o1, o2);

  compareGouvernorat = (o1: IGouvernorat | null, o2: IGouvernorat | null): boolean => this.gouvernoratService.compareGouvernorat(o1, o2);

  compareRegion = (o1: IRegion | null, o2: IRegion | null): boolean => this.regionService.compareRegion(o1, o2);

  compareRepresentant = (o1: IRepresentant | null, o2: IRepresentant | null): boolean =>
    this.representantService.compareRepresentant(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.client = client;
      if (client) {
        this.updateForm(client);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gatewayApp.error', { message: err.message })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const client = this.clientFormService.getClient(this.editForm);
    if (client.id !== null) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>): void {
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

  protected updateForm(client: IClient): void {
    this.client = client;
    this.clientFormService.resetForm(this.editForm, client);

    this.societesSharedCollection = this.societeService.addSocieteToCollectionIfMissing<ISociete>(
      this.societesSharedCollection,
      client.societe
    );
    this.activitesSharedCollection = this.activiteService.addActiviteToCollectionIfMissing<IActivite>(
      this.activitesSharedCollection,
      client.activite
    );
    this.secteursSharedCollection = this.secteurService.addSecteurToCollectionIfMissing<ISecteur>(
      this.secteursSharedCollection,
      client.secteur
    );
    this.banqueclsSharedCollection = this.banqueclService.addBanqueclToCollectionIfMissing<IBanquecl>(
      this.banqueclsSharedCollection,
      client.banquecl
    );
    this.postesSharedCollection = this.posteService.addPosteToCollectionIfMissing<IPoste>(this.postesSharedCollection, client.poste);
    this.moderegsSharedCollection = this.moderegService.addModeregToCollectionIfMissing<IModereg>(
      this.moderegsSharedCollection,
      client.modereg
    );
    this.categorietarifsSharedCollection = this.categorietarifService.addCategorietarifToCollectionIfMissing<ICategorietarif>(
      this.categorietarifsSharedCollection,
      client.categorietarif
    );
    this.gouvernoratsSharedCollection = this.gouvernoratService.addGouvernoratToCollectionIfMissing<IGouvernorat>(
      this.gouvernoratsSharedCollection,
      client.gouvernorat
    );
    this.regionsSharedCollection = this.regionService.addRegionToCollectionIfMissing<IRegion>(this.regionsSharedCollection, client.region);
    this.representantsSharedCollection = this.representantService.addRepresentantToCollectionIfMissing<IRepresentant>(
      this.representantsSharedCollection,
      client.representant
    );
  }

  protected loadRelationshipsOptions(): void {
    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISociete[]>) => res.body ?? []))
      .pipe(map((societes: ISociete[]) => this.societeService.addSocieteToCollectionIfMissing<ISociete>(societes, this.client?.societe)))
      .subscribe((societes: ISociete[]) => (this.societesSharedCollection = societes));

    this.activiteService
      .query()
      .pipe(map((res: HttpResponse<IActivite[]>) => res.body ?? []))
      .pipe(
        map((activites: IActivite[]) => this.activiteService.addActiviteToCollectionIfMissing<IActivite>(activites, this.client?.activite))
      )
      .subscribe((activites: IActivite[]) => (this.activitesSharedCollection = activites));

    this.secteurService
      .query()
      .pipe(map((res: HttpResponse<ISecteur[]>) => res.body ?? []))
      .pipe(map((secteurs: ISecteur[]) => this.secteurService.addSecteurToCollectionIfMissing<ISecteur>(secteurs, this.client?.secteur)))
      .subscribe((secteurs: ISecteur[]) => (this.secteursSharedCollection = secteurs));

    this.banqueclService
      .query()
      .pipe(map((res: HttpResponse<IBanquecl[]>) => res.body ?? []))
      .pipe(
        map((banquecls: IBanquecl[]) => this.banqueclService.addBanqueclToCollectionIfMissing<IBanquecl>(banquecls, this.client?.banquecl))
      )
      .subscribe((banquecls: IBanquecl[]) => (this.banqueclsSharedCollection = banquecls));

    this.posteService
      .query()
      .pipe(map((res: HttpResponse<IPoste[]>) => res.body ?? []))
      .pipe(map((postes: IPoste[]) => this.posteService.addPosteToCollectionIfMissing<IPoste>(postes, this.client?.poste)))
      .subscribe((postes: IPoste[]) => (this.postesSharedCollection = postes));

    this.moderegService
      .query()
      .pipe(map((res: HttpResponse<IModereg[]>) => res.body ?? []))
      .pipe(map((moderegs: IModereg[]) => this.moderegService.addModeregToCollectionIfMissing<IModereg>(moderegs, this.client?.modereg)))
      .subscribe((moderegs: IModereg[]) => (this.moderegsSharedCollection = moderegs));

    this.categorietarifService
      .query()
      .pipe(map((res: HttpResponse<ICategorietarif[]>) => res.body ?? []))
      .pipe(
        map((categorietarifs: ICategorietarif[]) =>
          this.categorietarifService.addCategorietarifToCollectionIfMissing<ICategorietarif>(categorietarifs, this.client?.categorietarif)
        )
      )
      .subscribe((categorietarifs: ICategorietarif[]) => (this.categorietarifsSharedCollection = categorietarifs));

    this.gouvernoratService
      .query()
      .pipe(map((res: HttpResponse<IGouvernorat[]>) => res.body ?? []))
      .pipe(
        map((gouvernorats: IGouvernorat[]) =>
          this.gouvernoratService.addGouvernoratToCollectionIfMissing<IGouvernorat>(gouvernorats, this.client?.gouvernorat)
        )
      )
      .subscribe((gouvernorats: IGouvernorat[]) => (this.gouvernoratsSharedCollection = gouvernorats));

    this.regionService
      .query()
      .pipe(map((res: HttpResponse<IRegion[]>) => res.body ?? []))
      .pipe(map((regions: IRegion[]) => this.regionService.addRegionToCollectionIfMissing<IRegion>(regions, this.client?.region)))
      .subscribe((regions: IRegion[]) => (this.regionsSharedCollection = regions));

    this.representantService
      .query()
      .pipe(map((res: HttpResponse<IRepresentant[]>) => res.body ?? []))
      .pipe(
        map((representants: IRepresentant[]) =>
          this.representantService.addRepresentantToCollectionIfMissing<IRepresentant>(representants, this.client?.representant)
        )
      )
      .subscribe((representants: IRepresentant[]) => (this.representantsSharedCollection = representants));
  }
}
