import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../societe.test-samples';

import { SocieteFormService } from './societe-form.service';

describe('Societe Form Service', () => {
  let service: SocieteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocieteFormService);
  });

  describe('Service methods', () => {
    describe('createSocieteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSocieteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            datecreation: expect.any(Object),
            matriculef: expect.any(Object),
            adresse: expect.any(Object),
            tel: expect.any(Object),
            fax: expect.any(Object),
            contact: expect.any(Object),
            portable: expect.any(Object),
            ville: expect.any(Object),
            codeposte: expect.any(Object),
            activite: expect.any(Object),
            photo: expect.any(Object),
          })
        );
      });

      it('passing ISociete should create a new form with FormGroup', () => {
        const formGroup = service.createSocieteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            datecreation: expect.any(Object),
            matriculef: expect.any(Object),
            adresse: expect.any(Object),
            tel: expect.any(Object),
            fax: expect.any(Object),
            contact: expect.any(Object),
            portable: expect.any(Object),
            ville: expect.any(Object),
            codeposte: expect.any(Object),
            activite: expect.any(Object),
            photo: expect.any(Object),
          })
        );
      });
    });

    describe('getSociete', () => {
      it('should return NewSociete for default Societe initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSocieteFormGroup(sampleWithNewData);

        const societe = service.getSociete(formGroup) as any;

        expect(societe).toMatchObject(sampleWithNewData);
      });

      it('should return NewSociete for empty Societe initial value', () => {
        const formGroup = service.createSocieteFormGroup();

        const societe = service.getSociete(formGroup) as any;

        expect(societe).toMatchObject({});
      });

      it('should return ISociete', () => {
        const formGroup = service.createSocieteFormGroup(sampleWithRequiredData);

        const societe = service.getSociete(formGroup) as any;

        expect(societe).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISociete should not enable id FormControl', () => {
        const formGroup = service.createSocieteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSociete should disable id FormControl', () => {
        const formGroup = service.createSocieteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
