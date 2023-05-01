jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GouvernoratService } from '../service/gouvernorat.service';

import { GouvernoratDeleteDialogComponent } from './gouvernorat-delete-dialog.component';

describe('Gouvernorat Management Delete Component', () => {
  let comp: GouvernoratDeleteDialogComponent;
  let fixture: ComponentFixture<GouvernoratDeleteDialogComponent>;
  let service: GouvernoratService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GouvernoratDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(GouvernoratDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GouvernoratDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GouvernoratService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete('ABC');
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith('ABC');
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
