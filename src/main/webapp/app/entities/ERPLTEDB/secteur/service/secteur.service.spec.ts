import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISecteur } from '../secteur.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../secteur.test-samples';

import { SecteurService } from './secteur.service';

const requireRestSample: ISecteur = {
  ...sampleWithRequiredData,
};

describe('Secteur Service', () => {
  let service: SecteurService;
  let httpMock: HttpTestingController;
  let expectedResult: ISecteur | ISecteur[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SecteurService);
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

    it('should create a Secteur', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const secteur = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(secteur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Secteur', () => {
      const secteur = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(secteur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Secteur', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Secteur', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Secteur', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSecteurToCollectionIfMissing', () => {
      it('should add a Secteur to an empty array', () => {
        const secteur: ISecteur = sampleWithRequiredData;
        expectedResult = service.addSecteurToCollectionIfMissing([], secteur);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(secteur);
      });

      it('should not add a Secteur to an array that contains it', () => {
        const secteur: ISecteur = sampleWithRequiredData;
        const secteurCollection: ISecteur[] = [
          {
            ...secteur,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSecteurToCollectionIfMissing(secteurCollection, secteur);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Secteur to an array that doesn't contain it", () => {
        const secteur: ISecteur = sampleWithRequiredData;
        const secteurCollection: ISecteur[] = [sampleWithPartialData];
        expectedResult = service.addSecteurToCollectionIfMissing(secteurCollection, secteur);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(secteur);
      });

      it('should add only unique Secteur to an array', () => {
        const secteurArray: ISecteur[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const secteurCollection: ISecteur[] = [sampleWithRequiredData];
        expectedResult = service.addSecteurToCollectionIfMissing(secteurCollection, ...secteurArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const secteur: ISecteur = sampleWithRequiredData;
        const secteur2: ISecteur = sampleWithPartialData;
        expectedResult = service.addSecteurToCollectionIfMissing([], secteur, secteur2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(secteur);
        expect(expectedResult).toContain(secteur2);
      });

      it('should accept null and undefined values', () => {
        const secteur: ISecteur = sampleWithRequiredData;
        expectedResult = service.addSecteurToCollectionIfMissing([], null, secteur, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(secteur);
      });

      it('should return initial array if no Secteur is added', () => {
        const secteurCollection: ISecteur[] = [sampleWithRequiredData];
        expectedResult = service.addSecteurToCollectionIfMissing(secteurCollection, undefined, null);
        expect(expectedResult).toEqual(secteurCollection);
      });
    });

    describe('compareSecteur', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSecteur(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareSecteur(entity1, entity2);
        const compareResult2 = service.compareSecteur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareSecteur(entity1, entity2);
        const compareResult2 = service.compareSecteur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareSecteur(entity1, entity2);
        const compareResult2 = service.compareSecteur(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
