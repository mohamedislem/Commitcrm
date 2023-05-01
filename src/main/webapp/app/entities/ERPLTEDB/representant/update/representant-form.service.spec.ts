import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../representant.test-samples';

import { RepresentantFormService } from './representant-form.service';

describe('Representant Form Service', () => {
  let service: RepresentantFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepresentantFormService);
  });

  describe('Service methods', () => {
    describe('createRepresentantFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRepresentantFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            modevisite: expect.any(Object),
            nbvisite: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });

      it('passing IRepresentant should create a new form with FormGroup', () => {
        const formGroup = service.createRepresentantFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            modevisite: expect.any(Object),
            nbvisite: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });
    });

    describe('getRepresentant', () => {
      it('should return NewRepresentant for default Representant initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRepresentantFormGroup(sampleWithNewData);

        const representant = service.getRepresentant(formGroup) as any;

        expect(representant).toMatchObject(sampleWithNewData);
      });

      it('should return NewRepresentant for empty Representant initial value', () => {
        const formGroup = service.createRepresentantFormGroup();

        const representant = service.getRepresentant(formGroup) as any;

        expect(representant).toMatchObject({});
      });

      it('should return IRepresentant', () => {
        const formGroup = service.createRepresentantFormGroup(sampleWithRequiredData);

        const representant = service.getRepresentant(formGroup) as any;

        expect(representant).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRepresentant should not enable id FormControl', () => {
        const formGroup = service.createRepresentantFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRepresentant should disable id FormControl', () => {
        const formGroup = service.createRepresentantFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
