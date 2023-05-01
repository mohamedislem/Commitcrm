import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RepresentantFormService } from './representant-form.service';
import { RepresentantService } from '../service/representant.service';
import { IRepresentant } from '../representant.model';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

import { RepresentantUpdateComponent } from './representant-update.component';

describe('Representant Management Update Component', () => {
  let comp: RepresentantUpdateComponent;
  let fixture: ComponentFixture<RepresentantUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let representantFormService: RepresentantFormService;
  let representantService: RepresentantService;
  let societeService: SocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RepresentantUpdateComponent],
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
      .overrideTemplate(RepresentantUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RepresentantUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    representantFormService = TestBed.inject(RepresentantFormService);
    representantService = TestBed.inject(RepresentantService);
    societeService = TestBed.inject(SocieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Societe query and add missing value', () => {
      const representant: IRepresentant = { id: 'CBA' };
      const societe: ISociete = { id: '19388117-2287-415d-b242-59213a3d47a9' };
      representant.societe = societe;

      const societeCollection: ISociete[] = [{ id: '8d46f7e0-37e5-4327-8c6c-e6f6049b7679' }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocietes = [societe];
      const expectedCollection: ISociete[] = [...additionalSocietes, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ representant });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocietes.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const representant: IRepresentant = { id: 'CBA' };
      const societe: ISociete = { id: '686db226-0e5e-4f0a-ab91-f8ad312cb45d' };
      representant.societe = societe;

      activatedRoute.data = of({ representant });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.representant).toEqual(representant);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRepresentant>>();
      const representant = { id: 'ABC' };
      jest.spyOn(representantFormService, 'getRepresentant').mockReturnValue(representant);
      jest.spyOn(representantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ representant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: representant }));
      saveSubject.complete();

      // THEN
      expect(representantFormService.getRepresentant).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(representantService.update).toHaveBeenCalledWith(expect.objectContaining(representant));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRepresentant>>();
      const representant = { id: 'ABC' };
      jest.spyOn(representantFormService, 'getRepresentant').mockReturnValue({ id: null });
      jest.spyOn(representantService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ representant: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: representant }));
      saveSubject.complete();

      // THEN
      expect(representantFormService.getRepresentant).toHaveBeenCalled();
      expect(representantService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRepresentant>>();
      const representant = { id: 'ABC' };
      jest.spyOn(representantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ representant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(representantService.update).toHaveBeenCalled();
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
