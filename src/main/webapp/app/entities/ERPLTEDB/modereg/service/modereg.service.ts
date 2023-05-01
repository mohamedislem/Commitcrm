import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IModereg, NewModereg } from '../modereg.model';

export type PartialUpdateModereg = Partial<IModereg> & Pick<IModereg, 'id'>;

export type EntityResponseType = HttpResponse<IModereg>;
export type EntityArrayResponseType = HttpResponse<IModereg[]>;

@Injectable({ providedIn: 'root' })
export class ModeregService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/moderegs', 'erpltedb');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(modereg: NewModereg): Observable<EntityResponseType> {
    return this.http.post<IModereg>(this.resourceUrl, modereg, { observe: 'response' });
  }

  update(modereg: IModereg): Observable<EntityResponseType> {
    return this.http.put<IModereg>(`${this.resourceUrl}/${this.getModeregIdentifier(modereg)}`, modereg, { observe: 'response' });
  }

  partialUpdate(modereg: PartialUpdateModereg): Observable<EntityResponseType> {
    return this.http.patch<IModereg>(`${this.resourceUrl}/${this.getModeregIdentifier(modereg)}`, modereg, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IModereg>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IModereg[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getModeregIdentifier(modereg: Pick<IModereg, 'id'>): string {
    return modereg.id;
  }

  compareModereg(o1: Pick<IModereg, 'id'> | null, o2: Pick<IModereg, 'id'> | null): boolean {
    return o1 && o2 ? this.getModeregIdentifier(o1) === this.getModeregIdentifier(o2) : o1 === o2;
  }

  addModeregToCollectionIfMissing<Type extends Pick<IModereg, 'id'>>(
    moderegCollection: Type[],
    ...moderegsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const moderegs: Type[] = moderegsToCheck.filter(isPresent);
    if (moderegs.length > 0) {
      const moderegCollectionIdentifiers = moderegCollection.map(moderegItem => this.getModeregIdentifier(moderegItem)!);
      const moderegsToAdd = moderegs.filter(moderegItem => {
        const moderegIdentifier = this.getModeregIdentifier(moderegItem);
        if (moderegCollectionIdentifiers.includes(moderegIdentifier)) {
          return false;
        }
        moderegCollectionIdentifiers.push(moderegIdentifier);
        return true;
      });
      return [...moderegsToAdd, ...moderegCollection];
    }
    return moderegCollection;
  }
}
