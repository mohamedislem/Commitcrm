import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CategorietarifDetailComponent } from './categorietarif-detail.component';

describe('Categorietarif Management Detail Component', () => {
  let comp: CategorietarifDetailComponent;
  let fixture: ComponentFixture<CategorietarifDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorietarifDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ categorietarif: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(CategorietarifDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CategorietarifDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load categorietarif on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.categorietarif).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
