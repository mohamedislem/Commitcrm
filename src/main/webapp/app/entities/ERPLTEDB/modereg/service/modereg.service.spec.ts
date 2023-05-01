import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IModereg } from '../modereg.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../modereg.test-samples';

import { ModeregService } from './modereg.service';

const requireRestSample: IModereg = {
  ...sampleWithRequiredData,
};

describe('Modereg Service', () => {
  let service: ModeregService;
  let httpMock: HttpTestingController;
  let expectedResult: IModereg | IModereg[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ModeregService);
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

    it('should create a Modereg', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const modereg = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(modereg).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Modereg', () => {
      const modereg = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(modereg).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Modereg', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Modereg', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Modereg', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addModeregToCollectionIfMissing', () => {
      it('should add a Modereg to an empty array', () => {
        const modereg: IModereg = sampleWithRequiredData;
        expectedResult = service.addModeregToCollectionIfMissing([], modereg);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(modereg);
      });

      it('should not add a Modereg to an array that contains it', () => {
        const modereg: IModereg = sampleWithRequiredData;
        const moderegCollection: IModereg[] = [
          {
            ...modereg,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addModeregToCollectionIfMissing(moderegCollection, modereg);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Modereg to an array that doesn't contain it", () => {
        const modereg: IModereg = sampleWithRequiredData;
        const moderegCollection: IModereg[] = [sampleWithPartialData];
        expectedResult = service.addModeregToCollectionIfMissing(moderegCollection, modereg);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(modereg);
      });

      it('should add only unique Modereg to an array', () => {
        const moderegArray: IModereg[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const moderegCollection: IModereg[] = [sampleWithRequiredData];
        expectedResult = service.addModeregToCollectionIfMissing(moderegCollection, ...moderegArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const modereg: IModereg = sampleWithRequiredData;
        const modereg2: IModereg = sampleWithPartialData;
        expectedResult = service.addModeregToCollectionIfMissing([], modereg, modereg2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(modereg);
        expect(expectedResult).toContain(modereg2);
      });

      it('should accept null and undefined values', () => {
        const modereg: IModereg = sampleWithRequiredData;
        expectedResult = service.addModeregToCollectionIfMissing([], null, modereg, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(modereg);
      });

      it('should return initial array if no Modereg is added', () => {
        const moderegCollection: IModereg[] = [sampleWithRequiredData];
        expectedResult = service.addModeregToCollectionIfMissing(moderegCollection, undefined, null);
        expect(expectedResult).toEqual(moderegCollection);
      });
    });

    describe('compareModereg', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareModereg(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareModereg(entity1, entity2);
        const compareResult2 = service.compareModereg(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareModereg(entity1, entity2);
        const compareResult2 = service.compareModereg(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareModereg(entity1, entity2);
        const compareResult2 = service.compareModereg(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
