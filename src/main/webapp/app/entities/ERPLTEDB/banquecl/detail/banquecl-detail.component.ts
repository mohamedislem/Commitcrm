import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBanquecl } from '../banquecl.model';

@Component({
  selector: 'jhi-banquecl-detail',
  templateUrl: './banquecl-detail.component.html',
})
export class BanqueclDetailComponent implements OnInit {
  banquecl: IBanquecl | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ banquecl }) => {
      this.banquecl = banquecl;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
