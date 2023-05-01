import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GouvernoratFormService } from './gouvernorat-form.service';
import { GouvernoratService } from '../service/gouvernorat.service';
import { IGouvernorat } from '../gouvernorat.model';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

import { GouvernoratUpdateComponent } from './gouvernorat-update.component';

describe('Gouvernorat Management Update Component', () => {
  let comp: GouvernoratUpdateComponent;
  let fixture: ComponentFixture<GouvernoratUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let gouvernoratFormService: GouvernoratFormService;
  let gouvernoratService: GouvernoratService;
  let societeService: SocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GouvernoratUpdateComponent],
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
      .overrideTemplate(GouvernoratUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GouvernoratUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    gouvernoratFormService = TestBed.inject(GouvernoratFormService);
    gouvernoratService = TestBed.inject(GouvernoratService);
    societeService = TestBed.inject(SocieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Societe query and add missing value', () => {
      const gouvernorat: IGouvernorat = { id: 'CBA' };
      const societe: ISociete = { id: '04495720-7f97-4723-9ff4-231d5c755eeb' };
      gouvernorat.societe = societe;

      const societeCollection: ISociete[] = [{ id: 'cc7569d0-243f-4cc6-b03c-4a3c5fac97c6' }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocietes = [societe];
      const expectedCollection: ISociete[] = [...additionalSocietes, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ gouvernorat });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocietes.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const gouvernorat: IGouvernorat = { id: 'CBA' };
      const societe: ISociete = { id: '629cec3b-e37f-4a3d-93d1-339bb0baac2e' };
      gouvernorat.societe = societe;

      activatedRoute.data = of({ gouvernorat });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.gouvernorat).toEqual(gouvernorat);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGouvernorat>>();
      const gouvernorat = { id: 'ABC' };
      jest.spyOn(gouvernoratFormService, 'getGouvernorat').mockReturnValue(gouvernorat);
      jest.spyOn(gouvernoratService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gouvernorat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gouvernorat }));
      saveSubject.complete();

      // THEN
      expect(gouvernoratFormService.getGouvernorat).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(gouvernoratService.update).toHaveBeenCalledWith(expect.objectContaining(gouvernorat));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGouvernorat>>();
      const gouvernorat = { id: 'ABC' };
      jest.spyOn(gouvernoratFormService, 'getGouvernorat').mockReturnValue({ id: null });
      jest.spyOn(gouvernoratService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gouvernorat: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gouvernorat }));
      saveSubject.complete();

      // THEN
      expect(gouvernoratFormService.getGouvernorat).toHaveBeenCalled();
      expect(gouvernoratService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGouvernorat>>();
      const gouvernorat = { id: 'ABC' };
      jest.spyOn(gouvernoratService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gouvernorat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(gouvernoratService.update).toHaveBeenCalled();
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
