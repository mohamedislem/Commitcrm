import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRepresentant } from '../representant.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../representant.test-samples';

import { RepresentantService } from './representant.service';

const requireRestSample: IRepresentant = {
  ...sampleWithRequiredData,
};

describe('Representant Service', () => {
  let service: RepresentantService;
  let httpMock: HttpTestingController;
  let expectedResult: IRepresentant | IRepresentant[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RepresentantService);
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

    it('should create a Representant', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const representant = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(representant).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Representant', () => {
      const representant = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(representant).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Representant', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Representant', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Representant', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRepresentantToCollectionIfMissing', () => {
      it('should add a Representant to an empty array', () => {
        const representant: IRepresentant = sampleWithRequiredData;
        expectedResult = service.addRepresentantToCollectionIfMissing([], representant);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(representant);
      });

      it('should not add a Representant to an array that contains it', () => {
        const representant: IRepresentant = sampleWithRequiredData;
        const representantCollection: IRepresentant[] = [
          {
            ...representant,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRepresentantToCollectionIfMissing(representantCollection, representant);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Representant to an array that doesn't contain it", () => {
        const representant: IRepresentant = sampleWithRequiredData;
        const representantCollection: IRepresentant[] = [sampleWithPartialData];
        expectedResult = service.addRepresentantToCollectionIfMissing(representantCollection, representant);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(representant);
      });

      it('should add only unique Representant to an array', () => {
        const representantArray: IRepresentant[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const representantCollection: IRepresentant[] = [sampleWithRequiredData];
        expectedResult = service.addRepresentantToCollectionIfMissing(representantCollection, ...representantArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const representant: IRepresentant = sampleWithRequiredData;
        const representant2: IRepresentant = sampleWithPartialData;
        expectedResult = service.addRepresentantToCollectionIfMissing([], representant, representant2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(representant);
        expect(expectedResult).toContain(representant2);
      });

      it('should accept null and undefined values', () => {
        const representant: IRepresentant = sampleWithRequiredData;
        expectedResult = service.addRepresentantToCollectionIfMissing([], null, representant, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(representant);
      });

      it('should return initial array if no Representant is added', () => {
        const representantCollection: IRepresentant[] = [sampleWithRequiredData];
        expectedResult = service.addRepresentantToCollectionIfMissing(representantCollection, undefined, null);
        expect(expectedResult).toEqual(representantCollection);
      });
    });

    describe('compareRepresentant', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRepresentant(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareRepresentant(entity1, entity2);
        const compareResult2 = service.compareRepresentant(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareRepresentant(entity1, entity2);
        const compareResult2 = service.compareRepresentant(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareRepresentant(entity1, entity2);
        const compareResult2 = service.compareRepresentant(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
