import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ClientFormService } from './client-form.service';
import { ClientService } from '../service/client.service';
import { IClient } from '../client.model';
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

import { ClientUpdateComponent } from './client-update.component';

describe('Client Management Update Component', () => {
  let comp: ClientUpdateComponent;
  let fixture: ComponentFixture<ClientUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let clientFormService: ClientFormService;
  let clientService: ClientService;
  let societeService: SocieteService;
  let activiteService: ActiviteService;
  let secteurService: SecteurService;
  let banqueclService: BanqueclService;
  let posteService: PosteService;
  let moderegService: ModeregService;
  let categorietarifService: CategorietarifService;
  let gouvernoratService: GouvernoratService;
  let regionService: RegionService;
  let representantService: RepresentantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ClientUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ClientUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClientUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    clientFormService = TestBed.inject(ClientFormService);
    clientService = TestBed.inject(ClientService);
    societeService = TestBed.inject(SocieteService);
    activiteService = TestBed.inject(ActiviteService);
    secteurService = TestBed.inject(SecteurService);
    banqueclService = TestBed.inject(BanqueclService);
    posteService = TestBed.inject(PosteService);
    moderegService = TestBed.inject(ModeregService);
    categorietarifService = TestBed.inject(CategorietarifService);
    gouvernoratService = TestBed.inject(GouvernoratService);
    regionService = TestBed.inject(RegionService);
    representantService = TestBed.inject(RepresentantService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Societe query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const societe: ISociete = { id: '7ae309a5-5377-4529-85ef-975ce625c25b' };
      client.societe = societe;

      const societeCollection: ISociete[] = [{ id: '712a6306-f7f3-48f1-ba0b-c661e8377131' }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocietes = [societe];
      const expectedCollection: ISociete[] = [...additionalSocietes, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocietes.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Activite query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const activite: IActivite = { id: 'dc362a1a-0266-4962-b6b5-e405e1929158' };
      client.activite = activite;

      const activiteCollection: IActivite[] = [{ id: 'c04bfeb3-0d75-4b38-9522-b9dac1b83476' }];
      jest.spyOn(activiteService, 'query').mockReturnValue(of(new HttpResponse({ body: activiteCollection })));
      const additionalActivites = [activite];
      const expectedCollection: IActivite[] = [...additionalActivites, ...activiteCollection];
      jest.spyOn(activiteService, 'addActiviteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(activiteService.query).toHaveBeenCalled();
      expect(activiteService.addActiviteToCollectionIfMissing).toHaveBeenCalledWith(
        activiteCollection,
        ...additionalActivites.map(expect.objectContaining)
      );
      expect(comp.activitesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Secteur query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const secteur: ISecteur = { id: 'c3770bb8-04d8-4cfd-9484-b9b1630a47c9' };
      client.secteur = secteur;

      const secteurCollection: ISecteur[] = [{ id: '0079225a-fecb-4994-8987-a244b5c2e508' }];
      jest.spyOn(secteurService, 'query').mockReturnValue(of(new HttpResponse({ body: secteurCollection })));
      const additionalSecteurs = [secteur];
      const expectedCollection: ISecteur[] = [...additionalSecteurs, ...secteurCollection];
      jest.spyOn(secteurService, 'addSecteurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(secteurService.query).toHaveBeenCalled();
      expect(secteurService.addSecteurToCollectionIfMissing).toHaveBeenCalledWith(
        secteurCollection,
        ...additionalSecteurs.map(expect.objectContaining)
      );
      expect(comp.secteursSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Banquecl query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const banquecl: IBanquecl = { id: 'be651759-abef-4635-aca3-479b52d30a7f' };
      client.banquecl = banquecl;

      const banqueclCollection: IBanquecl[] = [{ id: '362af000-c576-4ba5-8a21-41c11136cb56' }];
      jest.spyOn(banqueclService, 'query').mockReturnValue(of(new HttpResponse({ body: banqueclCollection })));
      const additionalBanquecls = [banquecl];
      const expectedCollection: IBanquecl[] = [...additionalBanquecls, ...banqueclCollection];
      jest.spyOn(banqueclService, 'addBanqueclToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(banqueclService.query).toHaveBeenCalled();
      expect(banqueclService.addBanqueclToCollectionIfMissing).toHaveBeenCalledWith(
        banqueclCollection,
        ...additionalBanquecls.map(expect.objectContaining)
      );
      expect(comp.banqueclsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Poste query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const poste: IPoste = { id: '46d60f3a-7672-4cfe-bbdc-b6c258441658' };
      client.poste = poste;

      const posteCollection: IPoste[] = [{ id: 'e6f6be0b-f177-4e58-a2fd-801d0c736fe9' }];
      jest.spyOn(posteService, 'query').mockReturnValue(of(new HttpResponse({ body: posteCollection })));
      const additionalPostes = [poste];
      const expectedCollection: IPoste[] = [...additionalPostes, ...posteCollection];
      jest.spyOn(posteService, 'addPosteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(posteService.query).toHaveBeenCalled();
      expect(posteService.addPosteToCollectionIfMissing).toHaveBeenCalledWith(
        posteCollection,
        ...additionalPostes.map(expect.objectContaining)
      );
      expect(comp.postesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Modereg query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const modereg: IModereg = { id: 'bde68c0a-21f6-40c4-ae60-e44a6e011b4a' };
      client.modereg = modereg;

      const moderegCollection: IModereg[] = [{ id: 'a434bb6d-7d28-4543-b892-ab25c2d6ea80' }];
      jest.spyOn(moderegService, 'query').mockReturnValue(of(new HttpResponse({ body: moderegCollection })));
      const additionalModeregs = [modereg];
      const expectedCollection: IModereg[] = [...additionalModeregs, ...moderegCollection];
      jest.spyOn(moderegService, 'addModeregToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(moderegService.query).toHaveBeenCalled();
      expect(moderegService.addModeregToCollectionIfMissing).toHaveBeenCalledWith(
        moderegCollection,
        ...additionalModeregs.map(expect.objectContaining)
      );
      expect(comp.moderegsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Categorietarif query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const categorietarif: ICategorietarif = { id: 'cc222921-18f8-4d35-be12-a721abb73fbb' };
      client.categorietarif = categorietarif;

      const categorietarifCollection: ICategorietarif[] = [{ id: '6463c66c-4ac8-49af-9e49-0c9422eb718b' }];
      jest.spyOn(categorietarifService, 'query').mockReturnValue(of(new HttpResponse({ body: categorietarifCollection })));
      const additionalCategorietarifs = [categorietarif];
      const expectedCollection: ICategorietarif[] = [...additionalCategorietarifs, ...categorietarifCollection];
      jest.spyOn(categorietarifService, 'addCategorietarifToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(categorietarifService.query).toHaveBeenCalled();
      expect(categorietarifService.addCategorietarifToCollectionIfMissing).toHaveBeenCalledWith(
        categorietarifCollection,
        ...additionalCategorietarifs.map(expect.objectContaining)
      );
      expect(comp.categorietarifsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Gouvernorat query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const gouvernorat: IGouvernorat = { id: '52f33e7f-2140-46be-9bfd-ed07db6c7ee0' };
      client.gouvernorat = gouvernorat;

      const gouvernoratCollection: IGouvernorat[] = [{ id: '89d0d844-852f-43bd-9374-f08027dc1967' }];
      jest.spyOn(gouvernoratService, 'query').mockReturnValue(of(new HttpResponse({ body: gouvernoratCollection })));
      const additionalGouvernorats = [gouvernorat];
      const expectedCollection: IGouvernorat[] = [...additionalGouvernorats, ...gouvernoratCollection];
      jest.spyOn(gouvernoratService, 'addGouvernoratToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(gouvernoratService.query).toHaveBeenCalled();
      expect(gouvernoratService.addGouvernoratToCollectionIfMissing).toHaveBeenCalledWith(
        gouvernoratCollection,
        ...additionalGouvernorats.map(expect.objectContaining)
      );
      expect(comp.gouvernoratsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Region query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const region: IRegion = { id: 'fa914ad8-e393-4e65-a0da-086670b9b378' };
      client.region = region;

      const regionCollection: IRegion[] = [{ id: 'ff353670-60d2-4fba-93af-c6ca53fc1a20' }];
      jest.spyOn(regionService, 'query').mockReturnValue(of(new HttpResponse({ body: regionCollection })));
      const additionalRegions = [region];
      const expectedCollection: IRegion[] = [...additionalRegions, ...regionCollection];
      jest.spyOn(regionService, 'addRegionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(regionService.query).toHaveBeenCalled();
      expect(regionService.addRegionToCollectionIfMissing).toHaveBeenCalledWith(
        regionCollection,
        ...additionalRegions.map(expect.objectContaining)
      );
      expect(comp.regionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Representant query and add missing value', () => {
      const client: IClient = { id: 'CBA' };
      const representant: IRepresentant = { id: '551630f5-0ac2-4b5c-925e-93463117c0cd' };
      client.representant = representant;

      const representantCollection: IRepresentant[] = [{ id: '1b084e37-331c-422c-9c76-df8b6df47f3c' }];
      jest.spyOn(representantService, 'query').mockReturnValue(of(new HttpResponse({ body: representantCollection })));
      const additionalRepresentants = [representant];
      const expectedCollection: IRepresentant[] = [...additionalRepresentants, ...representantCollection];
      jest.spyOn(representantService, 'addRepresentantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(representantService.query).toHaveBeenCalled();
      expect(representantService.addRepresentantToCollectionIfMissing).toHaveBeenCalledWith(
        representantCollection,
        ...additionalRepresentants.map(expect.objectContaining)
      );
      expect(comp.representantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const client: IClient = { id: 'CBA' };
      const societe: ISociete = { id: 'b92a6ba3-a622-4190-ad26-dc46b0449811' };
      client.societe = societe;
      const activite: IActivite = { id: '6c34e662-caee-4a46-9eea-ae040336b278' };
      client.activite = activite;
      const secteur: ISecteur = { id: 'f0d42e89-bc47-4e5b-be53-a3ae562626a0' };
      client.secteur = secteur;
      const banquecl: IBanquecl = { id: 'de0c595f-dd42-4182-9d20-bde595b5209b' };
      client.banquecl = banquecl;
      const poste: IPoste = { id: '86104a34-110d-4234-bdd3-3bf67f296463' };
      client.poste = poste;
      const modereg: IModereg = { id: '1b71f149-4c24-4d57-ba46-bbfeeba41c95' };
      client.modereg = modereg;
      const categorietarif: ICategorietarif = { id: '808b45d2-4d1b-4453-aa4b-a32677dd8646' };
      client.categorietarif = categorietarif;
      const gouvernorat: IGouvernorat = { id: 'cbbba251-98d1-4488-8d51-a02535879c8e' };
      client.gouvernorat = gouvernorat;
      const region: IRegion = { id: '7b8535ce-6593-4d21-86f2-04aa002dca2b' };
      client.region = region;
      const representant: IRepresentant = { id: '55dd71cc-2e48-48b7-a9f6-767d8ccc3f15' };
      client.representant = representant;

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.activitesSharedCollection).toContain(activite);
      expect(comp.secteursSharedCollection).toContain(secteur);
      expect(comp.banqueclsSharedCollection).toContain(banquecl);
      expect(comp.postesSharedCollection).toContain(poste);
      expect(comp.moderegsSharedCollection).toContain(modereg);
      expect(comp.categorietarifsSharedCollection).toContain(categorietarif);
      expect(comp.gouvernoratsSharedCollection).toContain(gouvernorat);
      expect(comp.regionsSharedCollection).toContain(region);
      expect(comp.representantsSharedCollection).toContain(representant);
      expect(comp.client).toEqual(client);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClient>>();
      const client = { id: 'ABC' };
      jest.spyOn(clientFormService, 'getClient').mockReturnValue(client);
      jest.spyOn(clientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ client });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: client }));
      saveSubject.complete();

      // THEN
      expect(clientFormService.getClient).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(clientService.update).toHaveBeenCalledWith(expect.objectContaining(client));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClient>>();
      const client = { id: 'ABC' };
      jest.spyOn(clientFormService, 'getClient').mockReturnValue({ id: null });
      jest.spyOn(clientService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ client: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: client }));
      saveSubject.complete();

      // THEN
      expect(clientFormService.getClient).toHaveBeenCalled();
      expect(clientService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClient>>();
      const client = { id: 'ABC' };
      jest.spyOn(clientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ client });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(clientService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSociete', () => {
      it('Should forward to societeService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(societeService, 'compareSociete');
        comp.compareSociete(entity, entity2);
        expect(societeService.compareSociete).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareActivite', () => {
      it('Should forward to activiteService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(activiteService, 'compareActivite');
        comp.compareActivite(entity, entity2);
        expect(activiteService.compareActivite).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSecteur', () => {
      it('Should forward to secteurService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(secteurService, 'compareSecteur');
        comp.compareSecteur(entity, entity2);
        expect(secteurService.compareSecteur).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBanquecl', () => {
      it('Should forward to banqueclService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(banqueclService, 'compareBanquecl');
        comp.compareBanquecl(entity, entity2);
        expect(banqueclService.compareBanquecl).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePoste', () => {
      it('Should forward to posteService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(posteService, 'comparePoste');
        comp.comparePoste(entity, entity2);
        expect(posteService.comparePoste).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareModereg', () => {
      it('Should forward to moderegService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(moderegService, 'compareModereg');
        comp.compareModereg(entity, entity2);
        expect(moderegService.compareModereg).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCategorietarif', () => {
      it('Should forward to categorietarifService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(categorietarifService, 'compareCategorietarif');
        comp.compareCategorietarif(entity, entity2);
        expect(categorietarifService.compareCategorietarif).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareGouvernorat', () => {
      it('Should forward to gouvernoratService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(gouvernoratService, 'compareGouvernorat');
        comp.compareGouvernorat(entity, entity2);
        expect(gouvernoratService.compareGouvernorat).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRegion', () => {
      it('Should forward to regionService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(regionService, 'compareRegion');
        comp.compareRegion(entity, entity2);
        expect(regionService.compareRegion).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRepresentant', () => {
      it('Should forward to representantService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(representantService, 'compareRepresentant');
        comp.compareRepresentant(entity, entity2);
        expect(representantService.compareRepresentant).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
