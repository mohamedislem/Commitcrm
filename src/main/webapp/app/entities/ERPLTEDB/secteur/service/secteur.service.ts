import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISecteur, NewSecteur } from '../secteur.model';

export type PartialUpdateSecteur = Partial<ISecteur> & Pick<ISecteur, 'id'>;

export type EntityResponseType = HttpResponse<ISecteur>;
export type EntityArrayResponseType = HttpResponse<ISecteur[]>;

@Injectable({ providedIn: 'root' })
export class SecteurService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/secteurs', 'erpltedb');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(secteur: NewSecteur): Observable<EntityResponseType> {
    return this.http.post<ISecteur>(this.resourceUrl, secteur, { observe: 'response' });
  }

  update(secteur: ISecteur): Observable<EntityResponseType> {
    return this.http.put<ISecteur>(`${this.resourceUrl}/${this.getSecteurIdentifier(secteur)}`, secteur, { observe: 'response' });
  }

  partialUpdate(secteur: PartialUpdateSecteur): Observable<EntityResponseType> {
    return this.http.patch<ISecteur>(`${this.resourceUrl}/${this.getSecteurIdentifier(secteur)}`, secteur, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISecteur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecteur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSecteurIdentifier(secteur: Pick<ISecteur, 'id'>): string {
    return secteur.id;
  }

  compareSecteur(o1: Pick<ISecteur, 'id'> | null, o2: Pick<ISecteur, 'id'> | null): boolean {
    return o1 && o2 ? this.getSecteurIdentifier(o1) === this.getSecteurIdentifier(o2) : o1 === o2;
  }

  addSecteurToCollectionIfMissing<Type extends Pick<ISecteur, 'id'>>(
    secteurCollection: Type[],
    ...secteursToCheck: (Type | null | undefined)[]
  ): Type[] {
    const secteurs: Type[] = secteursToCheck.filter(isPresent);
    if (secteurs.length > 0) {
      const secteurCollectionIdentifiers = secteurCollection.map(secteurItem => this.getSecteurIdentifier(secteurItem)!);
      const secteursToAdd = secteurs.filter(secteurItem => {
        const secteurIdentifier = this.getSecteurIdentifier(secteurItem);
        if (secteurCollectionIdentifiers.includes(secteurIdentifier)) {
          return false;
        }
        secteurCollectionIdentifiers.push(secteurIdentifier);
        return true;
      });
      return [...secteursToAdd, ...secteurCollection];
    }
    return secteurCollection;
  }
}
