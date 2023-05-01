import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBanquecl, NewBanquecl } from '../banquecl.model';

export type PartialUpdateBanquecl = Partial<IBanquecl> & Pick<IBanquecl, 'id'>;

export type EntityResponseType = HttpResponse<IBanquecl>;
export type EntityArrayResponseType = HttpResponse<IBanquecl[]>;

@Injectable({ providedIn: 'root' })
export class BanqueclService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/banquecls', 'erpltedb');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(banquecl: NewBanquecl): Observable<EntityResponseType> {
    return this.http.post<IBanquecl>(this.resourceUrl, banquecl, { observe: 'response' });
  }

  update(banquecl: IBanquecl): Observable<EntityResponseType> {
    return this.http.put<IBanquecl>(`${this.resourceUrl}/${this.getBanqueclIdentifier(banquecl)}`, banquecl, { observe: 'response' });
  }

  partialUpdate(banquecl: PartialUpdateBanquecl): Observable<EntityResponseType> {
    return this.http.patch<IBanquecl>(`${this.resourceUrl}/${this.getBanqueclIdentifier(banquecl)}`, banquecl, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IBanquecl>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBanquecl[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBanqueclIdentifier(banquecl: Pick<IBanquecl, 'id'>): string {
    return banquecl.id;
  }

  compareBanquecl(o1: Pick<IBanquecl, 'id'> | null, o2: Pick<IBanquecl, 'id'> | null): boolean {
    return o1 && o2 ? this.getBanqueclIdentifier(o1) === this.getBanqueclIdentifier(o2) : o1 === o2;
  }

  addBanqueclToCollectionIfMissing<Type extends Pick<IBanquecl, 'id'>>(
    banqueclCollection: Type[],
    ...banqueclsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const banquecls: Type[] = banqueclsToCheck.filter(isPresent);
    if (banquecls.length > 0) {
      const banqueclCollectionIdentifiers = banqueclCollection.map(banqueclItem => this.getBanqueclIdentifier(banqueclItem)!);
      const banqueclsToAdd = banquecls.filter(banqueclItem => {
        const banqueclIdentifier = this.getBanqueclIdentifier(banqueclItem);
        if (banqueclCollectionIdentifiers.includes(banqueclIdentifier)) {
          return false;
        }
        banqueclCollectionIdentifiers.push(banqueclIdentifier);
        return true;
      });
      return [...banqueclsToAdd, ...banqueclCollection];
    }
    return banqueclCollection;
  }
}
