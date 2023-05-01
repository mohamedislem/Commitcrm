import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISociete, NewSociete } from '../societe.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISociete for edit and NewSocieteFormGroupInput for create.
 */
type SocieteFormGroupInput = ISociete | PartialWithRequiredKeyOf<NewSociete>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISociete | NewSociete> = Omit<T, 'datecreation'> & {
  datecreation?: string | null;
};

type SocieteFormRawValue = FormValueOf<ISociete>;

type NewSocieteFormRawValue = FormValueOf<NewSociete>;

type SocieteFormDefaults = Pick<NewSociete, 'id' | 'datecreation'>;

type SocieteFormGroupContent = {
  id: FormControl<SocieteFormRawValue['id'] | NewSociete['id']>;
  code: FormControl<SocieteFormRawValue['code']>;
  name: FormControl<SocieteFormRawValue['name']>;
  datecreation: FormControl<SocieteFormRawValue['datecreation']>;
  matriculef: FormControl<SocieteFormRawValue['matriculef']>;
  adresse: FormControl<SocieteFormRawValue['adresse']>;
  tel: FormControl<SocieteFormRawValue['tel']>;
  fax: FormControl<SocieteFormRawValue['fax']>;
  contact: FormControl<SocieteFormRawValue['contact']>;
  portable: FormControl<SocieteFormRawValue['portable']>;
  ville: FormControl<SocieteFormRawValue['ville']>;
  codeposte: FormControl<SocieteFormRawValue['codeposte']>;
  activite: FormControl<SocieteFormRawValue['activite']>;
  photo: FormControl<SocieteFormRawValue['photo']>;
  photoContentType: FormControl<SocieteFormRawValue['photoContentType']>;
};

export type SocieteFormGroup = FormGroup<SocieteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SocieteFormService {
  createSocieteFormGroup(societe: SocieteFormGroupInput = { id: null }): SocieteFormGroup {
    const societeRawValue = this.convertSocieteToSocieteRawValue({
      ...this.getFormDefaults(),
      ...societe,
    });
    return new FormGroup<SocieteFormGroupContent>({
      id: new FormControl(
        { value: societeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      code: new FormControl(societeRawValue.code, {
        validators: [Validators.required],
      }),
      name: new FormControl(societeRawValue.name, {
        validators: [Validators.required],
      }),
      datecreation: new FormControl(societeRawValue.datecreation),
      matriculef: new FormControl(societeRawValue.matriculef),
      adresse: new FormControl(societeRawValue.adresse),
      tel: new FormControl(societeRawValue.tel),
      fax: new FormControl(societeRawValue.fax),
      contact: new FormControl(societeRawValue.contact),
      portable: new FormControl(societeRawValue.portable),
      ville: new FormControl(societeRawValue.ville),
      codeposte: new FormControl(societeRawValue.codeposte),
      activite: new FormControl(societeRawValue.activite),
      photo: new FormControl(societeRawValue.photo),
      photoContentType: new FormControl(societeRawValue.photoContentType),
    });
  }

  getSociete(form: SocieteFormGroup): ISociete | NewSociete {
    return this.convertSocieteRawValueToSociete(form.getRawValue() as SocieteFormRawValue | NewSocieteFormRawValue);
  }

  resetForm(form: SocieteFormGroup, societe: SocieteFormGroupInput): void {
    const societeRawValue = this.convertSocieteToSocieteRawValue({ ...this.getFormDefaults(), ...societe });
    form.reset(
      {
        ...societeRawValue,
        id: { value: societeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SocieteFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      datecreation: currentTime,
    };
  }

  private convertSocieteRawValueToSociete(rawSociete: SocieteFormRawValue | NewSocieteFormRawValue): ISociete | NewSociete {
    return {
      ...rawSociete,
      datecreation: dayjs(rawSociete.datecreation, DATE_TIME_FORMAT),
    };
  }

  private convertSocieteToSocieteRawValue(
    societe: ISociete | (Partial<NewSociete> & SocieteFormDefaults)
  ): SocieteFormRawValue | PartialWithRequiredKeyOf<NewSocieteFormRawValue> {
    return {
      ...societe,
      datecreation: societe.datecreation ? societe.datecreation.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
