import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../gouvernorat.test-samples';

import { GouvernoratFormService } from './gouvernorat-form.service';

describe('Gouvernorat Form Service', () => {
  let service: GouvernoratFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GouvernoratFormService);
  });

  describe('Service methods', () => {
    describe('createGouvernoratFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGouvernoratFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });

      it('passing IGouvernorat should create a new form with FormGroup', () => {
        const formGroup = service.createGouvernoratFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });
    });

    describe('getGouvernorat', () => {
      it('should return NewGouvernorat for default Gouvernorat initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGouvernoratFormGroup(sampleWithNewData);

        const gouvernorat = service.getGouvernorat(formGroup) as any;

        expect(gouvernorat).toMatchObject(sampleWithNewData);
      });

      it('should return NewGouvernorat for empty Gouvernorat initial value', () => {
        const formGroup = service.createGouvernoratFormGroup();

        const gouvernorat = service.getGouvernorat(formGroup) as any;

        expect(gouvernorat).toMatchObject({});
      });

      it('should return IGouvernorat', () => {
        const formGroup = service.createGouvernoratFormGroup(sampleWithRequiredData);

        const gouvernorat = service.getGouvernorat(formGroup) as any;

        expect(gouvernorat).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGouvernorat should not enable id FormControl', () => {
        const formGroup = service.createGouvernoratFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGouvernorat should disable id FormControl', () => {
        const formGroup = service.createGouvernoratFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
