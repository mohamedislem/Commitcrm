import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBanquecl } from '../banquecl.model';
import { BanqueclService } from '../service/banquecl.service';

@Injectable({ providedIn: 'root' })
export class BanqueclRoutingResolveService implements Resolve<IBanquecl | null> {
  constructor(protected service: BanqueclService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBanquecl | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((banquecl: HttpResponse<IBanquecl>) => {
          if (banquecl.body) {
            return of(banquecl.body);
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
