import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../categorietarif.test-samples';

import { CategorietarifFormService } from './categorietarif-form.service';

describe('Categorietarif Form Service', () => {
  let service: CategorietarifFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorietarifFormService);
  });

  describe('Service methods', () => {
    describe('createCategorietarifFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCategorietarifFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });

      it('passing ICategorietarif should create a new form with FormGroup', () => {
        const formGroup = service.createCategorietarifFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });
    });

    describe('getCategorietarif', () => {
      it('should return NewCategorietarif for default Categorietarif initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCategorietarifFormGroup(sampleWithNewData);

        const categorietarif = service.getCategorietarif(formGroup) as any;

        expect(categorietarif).toMatchObject(sampleWithNewData);
      });

      it('should return NewCategorietarif for empty Categorietarif initial value', () => {
        const formGroup = service.createCategorietarifFormGroup();

        const categorietarif = service.getCategorietarif(formGroup) as any;

        expect(categorietarif).toMatchObject({});
      });

      it('should return ICategorietarif', () => {
        const formGroup = service.createCategorietarifFormGroup(sampleWithRequiredData);

        const categorietarif = service.getCategorietarif(formGroup) as any;

        expect(categorietarif).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICategorietarif should not enable id FormControl', () => {
        const formGroup = service.createCategorietarifFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCategorietarif should disable id FormControl', () => {
        const formGroup = service.createCategorietarifFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
