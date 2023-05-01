import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModereg } from '../modereg.model';

@Component({
  selector: 'jhi-modereg-detail',
  templateUrl: './modereg-detail.component.html',
})
export class ModeregDetailComponent implements OnInit {
  modereg: IModereg | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modereg }) => {
      this.modereg = modereg;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
