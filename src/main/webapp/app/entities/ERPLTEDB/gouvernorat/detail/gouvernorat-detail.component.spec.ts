import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GouvernoratDetailComponent } from './gouvernorat-detail.component';

describe('Gouvernorat Management Detail Component', () => {
  let comp: GouvernoratDetailComponent;
  let fixture: ComponentFixture<GouvernoratDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GouvernoratDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ gouvernorat: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(GouvernoratDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GouvernoratDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load gouvernorat on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.gouvernorat).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
