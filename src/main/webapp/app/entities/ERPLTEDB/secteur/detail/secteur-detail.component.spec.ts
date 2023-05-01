import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecteurDetailComponent } from './secteur-detail.component';

describe('Secteur Management Detail Component', () => {
  let comp: SecteurDetailComponent;
  let fixture: ComponentFixture<SecteurDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecteurDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ secteur: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(SecteurDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SecteurDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load secteur on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.secteur).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
