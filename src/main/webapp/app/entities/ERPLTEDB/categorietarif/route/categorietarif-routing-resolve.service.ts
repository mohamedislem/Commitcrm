import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICategorietarif } from '../categorietarif.model';
import { CategorietarifService } from '../service/categorietarif.service';

@Injectable({ providedIn: 'root' })
export class CategorietarifRoutingResolveService implements Resolve<ICategorietarif | null> {
  constructor(protected service: CategorietarifService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategorietarif | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((categorietarif: HttpResponse<ICategorietarif>) => {
          if (categorietarif.body) {
            return of(categorietarif.body);
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
