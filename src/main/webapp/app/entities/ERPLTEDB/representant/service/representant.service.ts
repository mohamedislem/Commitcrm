import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRepresentant, NewRepresentant } from '../representant.model';

export type PartialUpdateRepresentant = Partial<IRepresentant> & Pick<IRepresentant, 'id'>;

export type EntityResponseType = HttpResponse<IRepresentant>;
export type EntityArrayResponseType = HttpResponse<IRepresentant[]>;

@Injectable({ providedIn: 'root' })
export class RepresentantService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/representants', 'erpltedb');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(representant: NewRepresentant): Observable<EntityResponseType> {
    return this.http.post<IRepresentant>(this.resourceUrl, representant, { observe: 'response' });
  }

  update(representant: IRepresentant): Observable<EntityResponseType> {
    return this.http.put<IRepresentant>(`${this.resourceUrl}/${this.getRepresentantIdentifier(representant)}`, representant, {
      observe: 'response',
    });
  }

  partialUpdate(representant: PartialUpdateRepresentant): Observable<EntityResponseType> {
    return this.http.patch<IRepresentant>(`${this.resourceUrl}/${this.getRepresentantIdentifier(representant)}`, representant, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IRepresentant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRepresentant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRepresentantIdentifier(representant: Pick<IRepresentant, 'id'>): string {
    return representant.id;
  }

  compareRepresentant(o1: Pick<IRepresentant, 'id'> | null, o2: Pick<IRepresentant, 'id'> | null): boolean {
    return o1 && o2 ? this.getRepresentantIdentifier(o1) === this.getRepresentantIdentifier(o2) : o1 === o2;
  }

  addRepresentantToCollectionIfMissing<Type extends Pick<IRepresentant, 'id'>>(
    representantCollection: Type[],
    ...representantsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const representants: Type[] = representantsToCheck.filter(isPresent);
    if (representants.length > 0) {
      const representantCollectionIdentifiers = representantCollection.map(
        representantItem => this.getRepresentantIdentifier(representantItem)!
      );
      const representantsToAdd = representants.filter(representantItem => {
        const representantIdentifier = this.getRepresentantIdentifier(representantItem);
        if (representantCollectionIdentifiers.includes(representantIdentifier)) {
          return false;
        }
        representantCollectionIdentifiers.push(representantIdentifier);
        return true;
      });
      return [...representantsToAdd, ...representantCollection];
    }
    return representantCollection;
  }
}
