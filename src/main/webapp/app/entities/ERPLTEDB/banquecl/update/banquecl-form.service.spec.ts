import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../banquecl.test-samples';

import { BanqueclFormService } from './banquecl-form.service';

describe('Banquecl Form Service', () => {
  let service: BanqueclFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanqueclFormService);
  });

  describe('Service methods', () => {
    describe('createBanqueclFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBanqueclFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });

      it('passing IBanquecl should create a new form with FormGroup', () => {
        const formGroup = service.createBanqueclFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });
    });

    describe('getBanquecl', () => {
      it('should return NewBanquecl for default Banquecl initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBanqueclFormGroup(sampleWithNewData);

        const banquecl = service.getBanquecl(formGroup) as any;

        expect(banquecl).toMatchObject(sampleWithNewData);
      });

      it('should return NewBanquecl for empty Banquecl initial value', () => {
        const formGroup = service.createBanqueclFormGroup();

        const banquecl = service.getBanquecl(formGroup) as any;

        expect(banquecl).toMatchObject({});
      });

      it('should return IBanquecl', () => {
        const formGroup = service.createBanqueclFormGroup(sampleWithRequiredData);

        const banquecl = service.getBanquecl(formGroup) as any;

        expect(banquecl).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBanquecl should not enable id FormControl', () => {
        const formGroup = service.createBanqueclFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBanquecl should disable id FormControl', () => {
        const formGroup = service.createBanqueclFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
