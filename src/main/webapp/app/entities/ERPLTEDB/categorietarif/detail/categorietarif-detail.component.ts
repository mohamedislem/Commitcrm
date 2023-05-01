import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategorietarif } from '../categorietarif.model';

@Component({
  selector: 'jhi-categorietarif-detail',
  templateUrl: './categorietarif-detail.component.html',
})
export class CategorietarifDetailComponent implements OnInit {
  categorietarif: ICategorietarif | null = null;
  ShowMe:boolean=false;
  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorietarif }) => {
      this.categorietarif = categorietarif;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
