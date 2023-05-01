import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICategorietarif, NewCategorietarif } from '../categorietarif.model';

export type PartialUpdateCategorietarif = Partial<ICategorietarif> & Pick<ICategorietarif, 'id'>;

export type EntityResponseType = HttpResponse<ICategorietarif>;
export type EntityArrayResponseType = HttpResponse<ICategorietarif[]>;

@Injectable({ providedIn: 'root' })
export class CategorietarifService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/categorietarifs', 'erpltedb');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(categorietarif: NewCategorietarif): Observable<EntityResponseType> {
    return this.http.post<ICategorietarif>(this.resourceUrl, categorietarif, { observe: 'response' });
  }

  update(categorietarif: ICategorietarif): Observable<EntityResponseType> {
    return this.http.put<ICategorietarif>(`${this.resourceUrl}/${this.getCategorietarifIdentifier(categorietarif)}`, categorietarif, {
      observe: 'response',
    });
  }

  partialUpdate(categorietarif: PartialUpdateCategorietarif): Observable<EntityResponseType> {
    return this.http.patch<ICategorietarif>(`${this.resourceUrl}/${this.getCategorietarifIdentifier(categorietarif)}`, categorietarif, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICategorietarif>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategorietarif[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCategorietarifIdentifier(categorietarif: Pick<ICategorietarif, 'id'>): string {
    return categorietarif.id;
  }

  compareCategorietarif(o1: Pick<ICategorietarif, 'id'> | null, o2: Pick<ICategorietarif, 'id'> | null): boolean {
    return o1 && o2 ? this.getCategorietarifIdentifier(o1) === this.getCategorietarifIdentifier(o2) : o1 === o2;
  }

  addCategorietarifToCollectionIfMissing<Type extends Pick<ICategorietarif, 'id'>>(
    categorietarifCollection: Type[],
    ...categorietarifsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const categorietarifs: Type[] = categorietarifsToCheck.filter(isPresent);
    if (categorietarifs.length > 0) {
      const categorietarifCollectionIdentifiers = categorietarifCollection.map(
        categorietarifItem => this.getCategorietarifIdentifier(categorietarifItem)!
      );
      const categorietarifsToAdd = categorietarifs.filter(categorietarifItem => {
        const categorietarifIdentifier = this.getCategorietarifIdentifier(categorietarifItem);
        if (categorietarifCollectionIdentifiers.includes(categorietarifIdentifier)) {
          return false;
        }
        categorietarifCollectionIdentifiers.push(categorietarifIdentifier);
        return true;
      });
      return [...categorietarifsToAdd, ...categorietarifCollection];
    }
    return categorietarifCollection;
  }
}
