import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RegionFormService } from './region-form.service';
import { RegionService } from '../service/region.service';
import { IRegion } from '../region.model';
import { IGouvernorat } from 'app/entities/ERPLTEDB/gouvernorat/gouvernorat.model';
import { GouvernoratService } from 'app/entities/ERPLTEDB/gouvernorat/service/gouvernorat.service';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

import { RegionUpdateComponent } from './region-update.component';

describe('Region Management Update Component', () => {
  let comp: RegionUpdateComponent;
  let fixture: ComponentFixture<RegionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let regionFormService: RegionFormService;
  let regionService: RegionService;
  let gouvernoratService: GouvernoratService;
  let societeService: SocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RegionUpdateComponent],
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
      .overrideTemplate(RegionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    regionFormService = TestBed.inject(RegionFormService);
    regionService = TestBed.inject(RegionService);
    gouvernoratService = TestBed.inject(GouvernoratService);
    societeService = TestBed.inject(SocieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Gouvernorat query and add missing value', () => {
      const region: IRegion = { id: 'CBA' };
      const gouvernorat: IGouvernorat = { id: 'd4be0938-8c68-4112-8240-b38bed90650c' };
      region.gouvernorat = gouvernorat;

      const gouvernoratCollection: IGouvernorat[] = [{ id: 'faf85fe1-e418-4d11-a1cd-32bb3a4bd0ed' }];
      jest.spyOn(gouvernoratService, 'query').mockReturnValue(of(new HttpResponse({ body: gouvernoratCollection })));
      const additionalGouvernorats = [gouvernorat];
      const expectedCollection: IGouvernorat[] = [...additionalGouvernorats, ...gouvernoratCollection];
      jest.spyOn(gouvernoratService, 'addGouvernoratToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ region });
      comp.ngOnInit();

      expect(gouvernoratService.query).toHaveBeenCalled();
      expect(gouvernoratService.addGouvernoratToCollectionIfMissing).toHaveBeenCalledWith(
        gouvernoratCollection,
        ...additionalGouvernorats.map(expect.objectContaining)
      );
      expect(comp.gouvernoratsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Societe query and add missing value', () => {
      const region: IRegion = { id: 'CBA' };
      const societe: ISociete = { id: '797e420c-9eaf-462a-90f2-5876f36f9ca9' };
      region.societe = societe;

      const societeCollection: ISociete[] = [{ id: 'eb4adc02-2c51-4d2a-9fe4-b80d7533ca3a' }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocietes = [societe];
      const expectedCollection: ISociete[] = [...additionalSocietes, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ region });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocietes.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const region: IRegion = { id: 'CBA' };
      const gouvernorat: IGouvernorat = { id: 'afe98f22-7b97-4c15-b749-c0546dac1ac9' };
      region.gouvernorat = gouvernorat;
      const societe: ISociete = { id: 'a3ffdd67-58fc-4b9f-8c8f-98c7c21c4821' };
      region.societe = societe;

      activatedRoute.data = of({ region });
      comp.ngOnInit();

      expect(comp.gouvernoratsSharedCollection).toContain(gouvernorat);
      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.region).toEqual(region);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegion>>();
      const region = { id: 'ABC' };
      jest.spyOn(regionFormService, 'getRegion').mockReturnValue(region);
      jest.spyOn(regionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ region });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: region }));
      saveSubject.complete();

      // THEN
      expect(regionFormService.getRegion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(regionService.update).toHaveBeenCalledWith(expect.objectContaining(region));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegion>>();
      const region = { id: 'ABC' };
      jest.spyOn(regionFormService, 'getRegion').mockReturnValue({ id: null });
      jest.spyOn(regionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ region: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: region }));
      saveSubject.complete();

      // THEN
      expect(regionFormService.getRegion).toHaveBeenCalled();
      expect(regionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegion>>();
      const region = { id: 'ABC' };
      jest.spyOn(regionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ region });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(regionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGouvernorat', () => {
      it('Should forward to gouvernoratService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(gouvernoratService, 'compareGouvernorat');
        comp.compareGouvernorat(entity, entity2);
        expect(gouvernoratService.compareGouvernorat).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
