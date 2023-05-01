import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRepresentant } from '../representant.model';
import { RepresentantService } from '../service/representant.service';

@Injectable({ providedIn: 'root' })
export class RepresentantRoutingResolveService implements Resolve<IRepresentant | null> {
  constructor(protected service: RepresentantService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRepresentant | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((representant: HttpResponse<IRepresentant>) => {
          if (representant.body) {
            return of(representant.body);
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
