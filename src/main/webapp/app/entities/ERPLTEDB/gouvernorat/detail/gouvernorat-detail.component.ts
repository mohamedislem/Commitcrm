import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGouvernorat } from '../gouvernorat.model';

@Component({
  selector: 'jhi-gouvernorat-detail',
  templateUrl: './gouvernorat-detail.component.html',
})
export class GouvernoratDetailComponent implements OnInit {
  gouvernorat: IGouvernorat | null = null;
  ShowMe:boolean=false;
  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gouvernorat }) => {
      this.gouvernorat = gouvernorat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
