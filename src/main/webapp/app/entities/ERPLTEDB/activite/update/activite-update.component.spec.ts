import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ActiviteFormService } from './activite-form.service';
import { ActiviteService } from '../service/activite.service';
import { IActivite } from '../activite.model';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

import { ActiviteUpdateComponent } from './activite-update.component';

describe('Activite Management Update Component', () => {
  let comp: ActiviteUpdateComponent;
  let fixture: ComponentFixture<ActiviteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let activiteFormService: ActiviteFormService;
  let activiteService: ActiviteService;
  let societeService: SocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ActiviteUpdateComponent],
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
      .overrideTemplate(ActiviteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ActiviteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    activiteFormService = TestBed.inject(ActiviteFormService);
    activiteService = TestBed.inject(ActiviteService);
    societeService = TestBed.inject(SocieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Societe query and add missing value', () => {
      const activite: IActivite = { id: 'CBA' };
      const societe: ISociete = { id: 'db10ca47-ae53-489c-9fe0-2fc361b87e03' };
      activite.societe = societe;

      const societeCollection: ISociete[] = [{ id: 'cde07f96-83a9-44d7-b1e8-21e0a8254c0a' }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocietes = [societe];
      const expectedCollection: ISociete[] = [...additionalSocietes, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocietes.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const activite: IActivite = { id: 'CBA' };
      const societe: ISociete = { id: '499265a6-7ab0-4acb-a187-a8b59b5e8673' };
      activite.societe = societe;

      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.activite).toEqual(activite);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivite>>();
      const activite = { id: 'ABC' };
      jest.spyOn(activiteFormService, 'getActivite').mockReturnValue(activite);
      jest.spyOn(activiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: activite }));
      saveSubject.complete();

      // THEN
      expect(activiteFormService.getActivite).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(activiteService.update).toHaveBeenCalledWith(expect.objectContaining(activite));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivite>>();
      const activite = { id: 'ABC' };
      jest.spyOn(activiteFormService, 'getActivite').mockReturnValue({ id: null });
      jest.spyOn(activiteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activite: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: activite }));
      saveSubject.complete();

      // THEN
      expect(activiteFormService.getActivite).toHaveBeenCalled();
      expect(activiteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivite>>();
      const activite = { id: 'ABC' };
      jest.spyOn(activiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(activiteService.update).toHaveBeenCalled();
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
