import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGouvernorat, NewGouvernorat } from '../gouvernorat.model';

export type PartialUpdateGouvernorat = Partial<IGouvernorat> & Pick<IGouvernorat, 'id'>;

export type EntityResponseType = HttpResponse<IGouvernorat>;
export type EntityArrayResponseType = HttpResponse<IGouvernorat[]>;

@Injectable({ providedIn: 'root' })
export class GouvernoratService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/gouvernorats', 'erpltedb');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(gouvernorat: NewGouvernorat): Observable<EntityResponseType> {
    return this.http.post<IGouvernorat>(this.resourceUrl, gouvernorat, { observe: 'response' });
  }

  update(gouvernorat: IGouvernorat): Observable<EntityResponseType> {
    return this.http.put<IGouvernorat>(`${this.resourceUrl}/${this.getGouvernoratIdentifier(gouvernorat)}`, gouvernorat, {
      observe: 'response',
    });
  }

  partialUpdate(gouvernorat: PartialUpdateGouvernorat): Observable<EntityResponseType> {
    return this.http.patch<IGouvernorat>(`${this.resourceUrl}/${this.getGouvernoratIdentifier(gouvernorat)}`, gouvernorat, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IGouvernorat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGouvernorat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGouvernoratIdentifier(gouvernorat: Pick<IGouvernorat, 'id'>): string {
    return gouvernorat.id;
  }

  compareGouvernorat(o1: Pick<IGouvernorat, 'id'> | null, o2: Pick<IGouvernorat, 'id'> | null): boolean {
    return o1 && o2 ? this.getGouvernoratIdentifier(o1) === this.getGouvernoratIdentifier(o2) : o1 === o2;
  }

  addGouvernoratToCollectionIfMissing<Type extends Pick<IGouvernorat, 'id'>>(
    gouvernoratCollection: Type[],
    ...gouvernoratsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const gouvernorats: Type[] = gouvernoratsToCheck.filter(isPresent);
    if (gouvernorats.length > 0) {
      const gouvernoratCollectionIdentifiers = gouvernoratCollection.map(
        gouvernoratItem => this.getGouvernoratIdentifier(gouvernoratItem)!
      );
      const gouvernoratsToAdd = gouvernorats.filter(gouvernoratItem => {
        const gouvernoratIdentifier = this.getGouvernoratIdentifier(gouvernoratItem);
        if (gouvernoratCollectionIdentifiers.includes(gouvernoratIdentifier)) {
          return false;
        }
        gouvernoratCollectionIdentifiers.push(gouvernoratIdentifier);
        return true;
      });
      return [...gouvernoratsToAdd, ...gouvernoratCollection];
    }
    return gouvernoratCollection;
  }
}
