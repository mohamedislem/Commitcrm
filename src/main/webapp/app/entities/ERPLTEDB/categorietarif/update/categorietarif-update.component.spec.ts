import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CategorietarifFormService } from './categorietarif-form.service';
import { CategorietarifService } from '../service/categorietarif.service';
import { ICategorietarif } from '../categorietarif.model';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

import { CategorietarifUpdateComponent } from './categorietarif-update.component';

describe('Categorietarif Management Update Component', () => {
  let comp: CategorietarifUpdateComponent;
  let fixture: ComponentFixture<CategorietarifUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let categorietarifFormService: CategorietarifFormService;
  let categorietarifService: CategorietarifService;
  let societeService: SocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CategorietarifUpdateComponent],
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
      .overrideTemplate(CategorietarifUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CategorietarifUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    categorietarifFormService = TestBed.inject(CategorietarifFormService);
    categorietarifService = TestBed.inject(CategorietarifService);
    societeService = TestBed.inject(SocieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Societe query and add missing value', () => {
      const categorietarif: ICategorietarif = { id: 'CBA' };
      const societe: ISociete = { id: '2dd96a94-2652-4fdb-8d25-5457a9146014' };
      categorietarif.societe = societe;

      const societeCollection: ISociete[] = [{ id: '0d9d3c76-d3d9-48d2-87a3-a8454a126e26' }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocietes = [societe];
      const expectedCollection: ISociete[] = [...additionalSocietes, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ categorietarif });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocietes.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const categorietarif: ICategorietarif = { id: 'CBA' };
      const societe: ISociete = { id: '202d2362-b349-4629-8386-93df07dfdcad' };
      categorietarif.societe = societe;

      activatedRoute.data = of({ categorietarif });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.categorietarif).toEqual(categorietarif);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategorietarif>>();
      const categorietarif = { id: 'ABC' };
      jest.spyOn(categorietarifFormService, 'getCategorietarif').mockReturnValue(categorietarif);
      jest.spyOn(categorietarifService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categorietarif });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categorietarif }));
      saveSubject.complete();

      // THEN
      expect(categorietarifFormService.getCategorietarif).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(categorietarifService.update).toHaveBeenCalledWith(expect.objectContaining(categorietarif));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategorietarif>>();
      const categorietarif = { id: 'ABC' };
      jest.spyOn(categorietarifFormService, 'getCategorietarif').mockReturnValue({ id: null });
      jest.spyOn(categorietarifService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categorietarif: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categorietarif }));
      saveSubject.complete();

      // THEN
      expect(categorietarifFormService.getCategorietarif).toHaveBeenCalled();
      expect(categorietarifService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategorietarif>>();
      const categorietarif = { id: 'ABC' };
      jest.spyOn(categorietarifService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categorietarif });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(categorietarifService.update).toHaveBeenCalled();
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
