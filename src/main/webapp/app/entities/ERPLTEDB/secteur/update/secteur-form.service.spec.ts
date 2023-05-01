import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../secteur.test-samples';

import { SecteurFormService } from './secteur-form.service';

describe('Secteur Form Service', () => {
  let service: SecteurFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecteurFormService);
  });

  describe('Service methods', () => {
    describe('createSecteurFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSecteurFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });

      it('passing ISecteur should create a new form with FormGroup', () => {
        const formGroup = service.createSecteurFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });
    });

    describe('getSecteur', () => {
      it('should return NewSecteur for default Secteur initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSecteurFormGroup(sampleWithNewData);

        const secteur = service.getSecteur(formGroup) as any;

        expect(secteur).toMatchObject(sampleWithNewData);
      });

      it('should return NewSecteur for empty Secteur initial value', () => {
        const formGroup = service.createSecteurFormGroup();

        const secteur = service.getSecteur(formGroup) as any;

        expect(secteur).toMatchObject({});
      });

      it('should return ISecteur', () => {
        const formGroup = service.createSecteurFormGroup(sampleWithRequiredData);

        const secteur = service.getSecteur(formGroup) as any;

        expect(secteur).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISecteur should not enable id FormControl', () => {
        const formGroup = service.createSecteurFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSecteur should disable id FormControl', () => {
        const formGroup = service.createSecteurFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
