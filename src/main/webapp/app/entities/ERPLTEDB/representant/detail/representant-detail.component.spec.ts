import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RepresentantDetailComponent } from './representant-detail.component';

describe('Representant Management Detail Component', () => {
  let comp: RepresentantDetailComponent;
  let fixture: ComponentFixture<RepresentantDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresentantDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ representant: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(RepresentantDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RepresentantDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load representant on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.representant).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
