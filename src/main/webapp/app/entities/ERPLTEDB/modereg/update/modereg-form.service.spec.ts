import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../modereg.test-samples';

import { ModeregFormService } from './modereg-form.service';

describe('Modereg Form Service', () => {
  let service: ModeregFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeregFormService);
  });

  describe('Service methods', () => {
    describe('createModeregFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createModeregFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });

      it('passing IModereg should create a new form with FormGroup', () => {
        const formGroup = service.createModeregFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });
    });

    describe('getModereg', () => {
      it('should return NewModereg for default Modereg initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createModeregFormGroup(sampleWithNewData);

        const modereg = service.getModereg(formGroup) as any;

        expect(modereg).toMatchObject(sampleWithNewData);
      });

      it('should return NewModereg for empty Modereg initial value', () => {
        const formGroup = service.createModeregFormGroup();

        const modereg = service.getModereg(formGroup) as any;

        expect(modereg).toMatchObject({});
      });

      it('should return IModereg', () => {
        const formGroup = service.createModeregFormGroup(sampleWithRequiredData);

        const modereg = service.getModereg(formGroup) as any;

        expect(modereg).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IModereg should not enable id FormControl', () => {
        const formGroup = service.createModeregFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewModereg should disable id FormControl', () => {
        const formGroup = service.createModeregFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
