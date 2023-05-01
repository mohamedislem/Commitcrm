import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISecteur } from '../secteur.model';
import { SecteurService } from '../service/secteur.service';

@Injectable({ providedIn: 'root' })
export class SecteurRoutingResolveService implements Resolve<ISecteur | null> {
  constructor(protected service: SecteurService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISecteur | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((secteur: HttpResponse<ISecteur>) => {
          if (secteur.body) {
            return of(secteur.body);
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
