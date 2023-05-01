jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CategorietarifService } from '../service/categorietarif.service';

import { CategorietarifDeleteDialogComponent } from './categorietarif-delete-dialog.component';

describe('Categorietarif Management Delete Component', () => {
  let comp: CategorietarifDeleteDialogComponent;
  let fixture: ComponentFixture<CategorietarifDeleteDialogComponent>;
  let service: CategorietarifService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CategorietarifDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(CategorietarifDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CategorietarifDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CategorietarifService);
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
