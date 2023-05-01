import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGouvernorat } from '../gouvernorat.model';
import { GouvernoratService } from '../service/gouvernorat.service';

@Injectable({ providedIn: 'root' })
export class GouvernoratRoutingResolveService implements Resolve<IGouvernorat | null> {
  constructor(protected service: GouvernoratService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGouvernorat | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((gouvernorat: HttpResponse<IGouvernorat>) => {
          if (gouvernorat.body) {
            return of(gouvernorat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
