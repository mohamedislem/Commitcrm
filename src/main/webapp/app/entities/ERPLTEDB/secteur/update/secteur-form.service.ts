import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISecteur, NewSecteur } from '../secteur.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISecteur for edit and NewSecteurFormGroupInput for create.
 */
type SecteurFormGroupInput = ISecteur | PartialWithRequiredKeyOf<NewSecteur>;

type SecteurFormDefaults = Pick<NewSecteur, 'id'>;

type SecteurFormGroupContent = {
  id: FormControl<ISecteur['id'] | NewSecteur['id']>;
  name: FormControl<ISecteur['name']>;
  societe: FormControl<ISecteur['societe']>;
};

export type SecteurFormGroup = FormGroup<SecteurFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SecteurFormService {
  createSecteurFormGroup(secteur: SecteurFormGroupInput = { id: null }): SecteurFormGroup {
    const secteurRawValue = {
      ...this.getFormDefaults(),
      ...secteur,
    };
    return new FormGroup<SecteurFormGroupContent>({
      id: new FormControl(
        { value: secteurRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(secteurRawValue.name, {
        validators: [Validators.required],
      }),
      societe: new FormControl(secteurRawValue.societe),
    });
  }

  getSecteur(form: SecteurFormGroup): ISecteur | NewSecteur {
    return form.getRawValue() as ISecteur | NewSecteur;
  }

  resetForm(form: SecteurFormGroup, secteur: SecteurFormGroupInput): void {
    const secteurRawValue = { ...this.getFormDefaults(), ...secteur };
    form.reset(
      {
        ...secteurRawValue,
        id: { value: secteurRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SecteurFormDefaults {
    return {
      id: null,
    };
  }
}
