import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BanqueclDetailComponent } from './banquecl-detail.component';

describe('Banquecl Management Detail Component', () => {
  let comp: BanqueclDetailComponent;
  let fixture: ComponentFixture<BanqueclDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanqueclDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ banquecl: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(BanqueclDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(BanqueclDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load banquecl on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.banquecl).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
