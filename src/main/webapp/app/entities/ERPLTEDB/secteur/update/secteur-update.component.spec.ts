import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SecteurFormService } from './secteur-form.service';
import { SecteurService } from '../service/secteur.service';
import { ISecteur } from '../secteur.model';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

import { SecteurUpdateComponent } from './secteur-update.component';

describe('Secteur Management Update Component', () => {
  let comp: SecteurUpdateComponent;
  let fixture: ComponentFixture<SecteurUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let secteurFormService: SecteurFormService;
  let secteurService: SecteurService;
  let societeService: SocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SecteurUpdateComponent],
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
      .overrideTemplate(SecteurUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SecteurUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    secteurFormService = TestBed.inject(SecteurFormService);
    secteurService = TestBed.inject(SecteurService);
    societeService = TestBed.inject(SocieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Societe query and add missing value', () => {
      const secteur: ISecteur = { id: 'CBA' };
      const societe: ISociete = { id: 'b06fd07c-8fa5-4cda-8a3b-eaf6f7383efb' };
      secteur.societe = societe;

      const societeCollection: ISociete[] = [{ id: '7baa880a-aac7-4f45-b705-79c8603de5b2' }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocietes = [societe];
      const expectedCollection: ISociete[] = [...additionalSocietes, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ secteur });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocietes.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const secteur: ISecteur = { id: 'CBA' };
      const societe: ISociete = { id: '3f8606a8-e16d-405a-8868-eebe0538e268' };
      secteur.societe = societe;

      activatedRoute.data = of({ secteur });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.secteur).toEqual(secteur);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecteur>>();
      const secteur = { id: 'ABC' };
      jest.spyOn(secteurFormService, 'getSecteur').mockReturnValue(secteur);
      jest.spyOn(secteurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ secteur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: secteur }));
      saveSubject.complete();

      // THEN
      expect(secteurFormService.getSecteur).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(secteurService.update).toHaveBeenCalledWith(expect.objectContaining(secteur));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecteur>>();
      const secteur = { id: 'ABC' };
      jest.spyOn(secteurFormService, 'getSecteur').mockReturnValue({ id: null });
      jest.spyOn(secteurService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ secteur: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: secteur }));
      saveSubject.complete();

      // THEN
      expect(secteurFormService.getSecteur).toHaveBeenCalled();
      expect(secteurService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecteur>>();
      const secteur = { id: 'ABC' };
      jest.spyOn(secteurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ secteur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(secteurService.update).toHaveBeenCalled();
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
  });
});
