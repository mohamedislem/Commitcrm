import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGouvernorat } from '../gouvernorat.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../gouvernorat.test-samples';

import { GouvernoratService } from './gouvernorat.service';

const requireRestSample: IGouvernorat = {
  ...sampleWithRequiredData,
};

describe('Gouvernorat Service', () => {
  let service: GouvernoratService;
  let httpMock: HttpTestingController;
  let expectedResult: IGouvernorat | IGouvernorat[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GouvernoratService);
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

    it('should create a Gouvernorat', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const gouvernorat = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(gouvernorat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Gouvernorat', () => {
      const gouvernorat = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(gouvernorat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Gouvernorat', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Gouvernorat', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Gouvernorat', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGouvernoratToCollectionIfMissing', () => {
      it('should add a Gouvernorat to an empty array', () => {
        const gouvernorat: IGouvernorat = sampleWithRequiredData;
        expectedResult = service.addGouvernoratToCollectionIfMissing([], gouvernorat);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(gouvernorat);
      });

      it('should not add a Gouvernorat to an array that contains it', () => {
        const gouvernorat: IGouvernorat = sampleWithRequiredData;
        const gouvernoratCollection: IGouvernorat[] = [
          {
            ...gouvernorat,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGouvernoratToCollectionIfMissing(gouvernoratCollection, gouvernorat);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Gouvernorat to an array that doesn't contain it", () => {
        const gouvernorat: IGouvernorat = sampleWithRequiredData;
        const gouvernoratCollection: IGouvernorat[] = [sampleWithPartialData];
        expectedResult = service.addGouvernoratToCollectionIfMissing(gouvernoratCollection, gouvernorat);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(gouvernorat);
      });

      it('should add only unique Gouvernorat to an array', () => {
        const gouvernoratArray: IGouvernorat[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const gouvernoratCollection: IGouvernorat[] = [sampleWithRequiredData];
        expectedResult = service.addGouvernoratToCollectionIfMissing(gouvernoratCollection, ...gouvernoratArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const gouvernorat: IGouvernorat = sampleWithRequiredData;
        const gouvernorat2: IGouvernorat = sampleWithPartialData;
        expectedResult = service.addGouvernoratToCollectionIfMissing([], gouvernorat, gouvernorat2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(gouvernorat);
        expect(expectedResult).toContain(gouvernorat2);
      });

      it('should accept null and undefined values', () => {
        const gouvernorat: IGouvernorat = sampleWithRequiredData;
        expectedResult = service.addGouvernoratToCollectionIfMissing([], null, gouvernorat, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(gouvernorat);
      });

      it('should return initial array if no Gouvernorat is added', () => {
        const gouvernoratCollection: IGouvernorat[] = [sampleWithRequiredData];
        expectedResult = service.addGouvernoratToCollectionIfMissing(gouvernoratCollection, undefined, null);
        expect(expectedResult).toEqual(gouvernoratCollection);
      });
    });

    describe('compareGouvernorat', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGouvernorat(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareGouvernorat(entity1, entity2);
        const compareResult2 = service.compareGouvernorat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareGouvernorat(entity1, entity2);
        const compareResult2 = service.compareGouvernorat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareGouvernorat(entity1, entity2);
        const compareResult2 = service.compareGouvernorat(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
