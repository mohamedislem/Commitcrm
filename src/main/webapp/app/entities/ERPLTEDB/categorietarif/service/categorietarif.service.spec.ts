import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICategorietarif } from '../categorietarif.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../categorietarif.test-samples';

import { CategorietarifService } from './categorietarif.service';

const requireRestSample: ICategorietarif = {
  ...sampleWithRequiredData,
};

describe('Categorietarif Service', () => {
  let service: CategorietarifService;
  let httpMock: HttpTestingController;
  let expectedResult: ICategorietarif | ICategorietarif[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CategorietarifService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Categorietarif', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const categorietarif = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(categorietarif).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Categorietarif', () => {
      const categorietarif = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(categorietarif).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Categorietarif', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Categorietarif', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Categorietarif', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCategorietarifToCollectionIfMissing', () => {
      it('should add a Categorietarif to an empty array', () => {
        const categorietarif: ICategorietarif = sampleWithRequiredData;
        expectedResult = service.addCategorietarifToCollectionIfMissing([], categorietarif);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(categorietarif);
      });

      it('should not add a Categorietarif to an array that contains it', () => {
        const categorietarif: ICategorietarif = sampleWithRequiredData;
        const categorietarifCollection: ICategorietarif[] = [
          {
            ...categorietarif,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCategorietarifToCollectionIfMissing(categorietarifCollection, categorietarif);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Categorietarif to an array that doesn't contain it", () => {
        const categorietarif: ICategorietarif = sampleWithRequiredData;
        const categorietarifCollection: ICategorietarif[] = [sampleWithPartialData];
        expectedResult = service.addCategorietarifToCollectionIfMissing(categorietarifCollection, categorietarif);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(categorietarif);
      });

      it('should add only unique Categorietarif to an array', () => {
        const categorietarifArray: ICategorietarif[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const categorietarifCollection: ICategorietarif[] = [sampleWithRequiredData];
        expectedResult = service.addCategorietarifToCollectionIfMissing(categorietarifCollection, ...categorietarifArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const categorietarif: ICategorietarif = sampleWithRequiredData;
        const categorietarif2: ICategorietarif = sampleWithPartialData;
        expectedResult = service.addCategorietarifToCollectionIfMissing([], categorietarif, categorietarif2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(categorietarif);
        expect(expectedResult).toContain(categorietarif2);
      });

      it('should accept null and undefined values', () => {
        const categorietarif: ICategorietarif = sampleWithRequiredData;
        expectedResult = service.addCategorietarifToCollectionIfMissing([], null, categorietarif, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(categorietarif);
      });

      it('should return initial array if no Categorietarif is added', () => {
        const categorietarifCollection: ICategorietarif[] = [sampleWithRequiredData];
        expectedResult = service.addCategorietarifToCollectionIfMissing(categorietarifCollection, undefined, null);
        expect(expectedResult).toEqual(categorietarifCollection);
      });
    });

    describe('compareCategorietarif', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCategorietarif(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareCategorietarif(entity1, entity2);
        const compareResult2 = service.compareCategorietarif(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareCategorietarif(entity1, entity2);
        const compareResult2 = service.compareCategorietarif(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareCategorietarif(entity1, entity2);
        const compareResult2 = service.compareCategorietarif(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
