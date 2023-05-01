import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../client.test-samples';

import { ClientFormService } from './client-form.service';

describe('Client Form Service', () => {
  let service: ClientFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientFormService);
  });

  describe('Service methods', () => {
    describe('createClientFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createClientFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            adresse: expect.any(Object),
            typelocal: expect.any(Object),
            matriculef: expect.any(Object),
            tel: expect.any(Object),
            fax: expect.any(Object),
            regcom: expect.any(Object),
            email: expect.any(Object),
            rib: expect.any(Object),
            personnecont: expect.any(Object),
            photo: expect.any(Object),
            srisque: expect.any(Object),
            scredit: expect.any(Object),
            blocage: expect.any(Object),
            timbre: expect.any(Object),
            regime: expect.any(Object),
            typeclient: expect.any(Object),
            typepatante: expect.any(Object),
            note: expect.any(Object),
            numportable: expect.any(Object),
            delaitreg: expect.any(Object),
            numdecision: expect.any(Object),
            datedebut: expect.any(Object),
            datefin: expect.any(Object),
            datecreation: expect.any(Object),
            datevalidation: expect.any(Object),
            societe: expect.any(Object),
            activite: expect.any(Object),
            secteur: expect.any(Object),
            banquecl: expect.any(Object),
            poste: expect.any(Object),
            modereg: expect.any(Object),
            categorietarif: expect.any(Object),
            gouvernorat: expect.any(Object),
            region: expect.any(Object),
            representant: expect.any(Object),
          })
        );
      });

      it('passing IClient should create a new form with FormGroup', () => {
        const formGroup = service.createClientFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            adresse: expect.any(Object),
            typelocal: expect.any(Object),
            matriculef: expect.any(Object),
            tel: expect.any(Object),
            fax: expect.any(Object),
            regcom: expect.any(Object),
            email: expect.any(Object),
            rib: expect.any(Object),
            personnecont: expect.any(Object),
            photo: expect.any(Object),
            srisque: expect.any(Object),
            scredit: expect.any(Object),
            blocage: expect.any(Object),
            timbre: expect.any(Object),
            regime: expect.any(Object),
            typeclient: expect.any(Object),
            typepatante: expect.any(Object),
            note: expect.any(Object),
            numportable: expect.any(Object),
            delaitreg: expect.any(Object),
            numdecision: expect.any(Object),
            datedebut: expect.any(Object),
            datefin: expect.any(Object),
            datecreation: expect.any(Object),
            datevalidation: expect.any(Object),
            societe: expect.any(Object),
            activite: expect.any(Object),
            secteur: expect.any(Object),
            banquecl: expect.any(Object),
            poste: expect.any(Object),
            modereg: expect.any(Object),
            categorietarif: expect.any(Object),
            gouvernorat: expect.any(Object),
            region: expect.any(Object),
            representant: expect.any(Object),
          })
        );
      });
    });

    describe('getClient', () => {
      it('should return NewClient for default Client initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createClientFormGroup(sampleWithNewData);

        const client = service.getClient(formGroup) as any;

        expect(client).toMatchObject(sampleWithNewData);
      });

      it('should return NewClient for empty Client initial value', () => {
        const formGroup = service.createClientFormGroup();

        const client = service.getClient(formGroup) as any;

        expect(client).toMatchObject({});
      });

      it('should return IClient', () => {
        const formGroup = service.createClientFormGroup(sampleWithRequiredData);

        const client = service.getClient(formGroup) as any;

        expect(client).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IClient should not enable id FormControl', () => {
        const formGroup = service.createClientFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewClient should disable id FormControl', () => {
        const formGroup = service.createClientFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
