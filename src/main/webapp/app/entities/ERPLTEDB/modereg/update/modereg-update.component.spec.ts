import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ModeregFormService } from './modereg-form.service';
import { ModeregService } from '../service/modereg.service';
import { IModereg } from '../modereg.model';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { SocieteService } from 'app/entities/ERPLTEDB/societe/service/societe.service';

import { ModeregUpdateComponent } from './modereg-update.component';

describe('Modereg Management Update Component', () => {
  let comp: ModeregUpdateComponent;
  let fixture: ComponentFixture<ModeregUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let moderegFormService: ModeregFormService;
  let moderegService: ModeregService;
  let societeService: SocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ModeregUpdateComponent],
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
      .overrideTemplate(ModeregUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ModeregUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    moderegFormService = TestBed.inject(ModeregFormService);
    moderegService = TestBed.inject(ModeregService);
    societeService = TestBed.inject(SocieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Societe query and add missing value', () => {
      const modereg: IModereg = { id: 'CBA' };
      const societe: ISociete = { id: 'bd4e3e94-fd43-412d-a335-e6e5920f4018' };
      modereg.societe = societe;

      const societeCollection: ISociete[] = [{ id: '005b383c-f9c1-4d94-9c57-287402b0d9a3' }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocietes = [societe];
      const expectedCollection: ISociete[] = [...additionalSocietes, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ modereg });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocietes.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const modereg: IModereg = { id: 'CBA' };
      const societe: ISociete = { id: '56f29ca0-b395-440d-a8b7-9338d41b2a2c' };
      modereg.societe = societe;

      activatedRoute.data = of({ modereg });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.modereg).toEqual(modereg);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IModereg>>();
      const modereg = { id: 'ABC' };
      jest.spyOn(moderegFormService, 'getModereg').mockReturnValue(modereg);
      jest.spyOn(moderegService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modereg });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: modereg }));
      saveSubject.complete();

      // THEN
      expect(moderegFormService.getModereg).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(moderegService.update).toHaveBeenCalledWith(expect.objectContaining(modereg));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IModereg>>();
      const modereg = { id: 'ABC' };
      jest.spyOn(moderegFormService, 'getModereg').mockReturnValue({ id: null });
      jest.spyOn(moderegService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modereg: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: modereg }));
      saveSubject.complete();

      // THEN
      expect(moderegFormService.getModereg).toHaveBeenCalled();
      expect(moderegService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IModereg>>();
      const modereg = { id: 'ABC' };
      jest.spyOn(moderegService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modereg });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(moderegService.update).toHaveBeenCalled();
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
