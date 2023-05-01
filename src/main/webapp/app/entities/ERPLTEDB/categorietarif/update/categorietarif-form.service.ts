import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICategorietarif, NewCategorietarif } from '../categorietarif.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICategorietarif for edit and NewCategorietarifFormGroupInput for create.
 */
type CategorietarifFormGroupInput = ICategorietarif | PartialWithRequiredKeyOf<NewCategorietarif>;

type CategorietarifFormDefaults = Pick<NewCategorietarif, 'id'>;

type CategorietarifFormGroupContent = {
  id: FormControl<ICategorietarif['id'] | NewCategorietarif['id']>;
  name: FormControl<ICategorietarif['name']>;
  societe: FormControl<ICategorietarif['societe']>;
};

export type CategorietarifFormGroup = FormGroup<CategorietarifFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CategorietarifFormService {
  createCategorietarifFormGroup(categorietarif: CategorietarifFormGroupInput = { id: null }): CategorietarifFormGroup {
    const categorietarifRawValue = {
      ...this.getFormDefaults(),
      ...categorietarif,
    };
    return new FormGroup<CategorietarifFormGroupContent>({
      id: new FormControl(
        { value: categorietarifRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(categorietarifRawValue.name, {
        validators: [Validators.required],
      }),
      societe: new FormControl(categorietarifRawValue.societe),
    });
  }

  getCategorietarif(form: CategorietarifFormGroup): ICategorietarif | NewCategorietarif {
    return form.getRawValue() as ICategorietarif | NewCategorietarif;
  }

  resetForm(form: CategorietarifFormGroup, categorietarif: CategorietarifFormGroupInput): void {
    const categorietarifRawValue = { ...this.getFormDefaults(), ...categorietarif };
    form.reset(
      {
        ...categorietarifRawValue,
        id: { value: categorietarifRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CategorietarifFormDefaults {
    return {
      id: null,
    };
  }
}
