import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IModereg } from '../modereg.model';
import { ModeregService } from '../service/modereg.service';

@Injectable({ providedIn: 'root' })
export class ModeregRoutingResolveService implements Resolve<IModereg | null> {
  constructor(protected service: ModeregService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IModereg | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((modereg: HttpResponse<IModereg>) => {
          if (modereg.body) {
            return of(modereg.body);
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
