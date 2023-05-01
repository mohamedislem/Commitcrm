import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ModeregDetailComponent } from './modereg-detail.component';

describe('Modereg Management Detail Component', () => {
  let comp: ModeregDetailComponent;
  let fixture: ComponentFixture<ModeregDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeregDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ modereg: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(ModeregDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ModeregDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load modereg on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.modereg).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
