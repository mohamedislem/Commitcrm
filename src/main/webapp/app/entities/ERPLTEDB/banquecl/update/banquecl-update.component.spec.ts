import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BanqueclFormService } from './banquecl-form.service';
import { BanqueclService } from '../service/banquecl.service';
import { IBanquecl } from '../banquecl.model';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

import { BanqueclUpdateComponent } from './banquecl-update.component';

describe('Banquecl Management Update Component', () => {
  let comp: BanqueclUpdateComponent;
  let fixture: ComponentFixture<BanqueclUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let banqueclFormService: BanqueclFormService;
  let banqueclService: BanqueclService;
  let societeService: SocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BanqueclUpdateComponent],
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
      .overrideTemplate(BanqueclUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BanqueclUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    banqueclFormService = TestBed.inject(BanqueclFormService);
    banqueclService = TestBed.inject(BanqueclService);
    societeService = TestBed.inject(SocieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Societe query and add missing value', () => {
      const banquecl: IBanquecl = { id: 'CBA' };
      const societe: ISociete = { id: '2bb82260-288b-4142-861a-3ac41109cb39' };
      banquecl.societe = societe;

      const societeCollection: ISociete[] = [{ id: 'b3a38906-3953-4d1d-9b58-b10480d9f0d5' }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocietes = [societe];
      const expectedCollection: ISociete[] = [...additionalSocietes, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ banquecl });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocietes.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const banquecl: IBanquecl = { id: 'CBA' };
      const societe: ISociete = { id: '2c6edf30-dfb4-476c-afc8-bb3831b35184' };
      banquecl.societe = societe;

      activatedRoute.data = of({ banquecl });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.banquecl).toEqual(banquecl);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBanquecl>>();
      const banquecl = { id: 'ABC' };
      jest.spyOn(banqueclFormService, 'getBanquecl').mockReturnValue(banquecl);
      jest.spyOn(banqueclService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ banquecl });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: banquecl }));
      saveSubject.complete();

      // THEN
      expect(banqueclFormService.getBanquecl).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(banqueclService.update).toHaveBeenCalledWith(expect.objectContaining(banquecl));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBanquecl>>();
      const banquecl = { id: 'ABC' };
      jest.spyOn(banqueclFormService, 'getBanquecl').mockReturnValue({ id: null });
      jest.spyOn(banqueclService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ banquecl: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: banquecl }));
      saveSubject.complete();

      // THEN
      expect(banqueclFormService.getBanquecl).toHaveBeenCalled();
      expect(banqueclService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBanquecl>>();
      const banquecl = { id: 'ABC' };
      jest.spyOn(banqueclService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ banquecl });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(banqueclService.update).toHaveBeenCalled();
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
