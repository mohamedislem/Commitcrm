import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGouvernorat, NewGouvernorat } from '../gouvernorat.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGouvernorat for edit and NewGouvernoratFormGroupInput for create.
 */
type GouvernoratFormGroupInput = IGouvernorat | PartialWithRequiredKeyOf<NewGouvernorat>;

type GouvernoratFormDefaults = Pick<NewGouvernorat, 'id'>;

type GouvernoratFormGroupContent = {
  id: FormControl<IGouvernorat['id'] | NewGouvernorat['id']>;
  name: FormControl<IGouvernorat['name']>;
  societe: FormControl<IGouvernorat['societe']>;
};

export type GouvernoratFormGroup = FormGroup<GouvernoratFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GouvernoratFormService {
  createGouvernoratFormGroup(gouvernorat: GouvernoratFormGroupInput = { id: null }): GouvernoratFormGroup {
    const gouvernoratRawValue = {
      ...this.getFormDefaults(),
      ...gouvernorat,
    };
    return new FormGroup<GouvernoratFormGroupContent>({
      id: new FormControl(
        { value: gouvernoratRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(gouvernoratRawValue.name, {
        validators: [Validators.required],
      }),
      societe: new FormControl(gouvernoratRawValue.societe),
    });
  }

  getGouvernorat(form: GouvernoratFormGroup): IGouvernorat | NewGouvernorat {
    return form.getRawValue() as IGouvernorat | NewGouvernorat;
  }

  resetForm(form: GouvernoratFormGroup, gouvernorat: GouvernoratFormGroupInput): void {
    const gouvernoratRawValue = { ...this.getFormDefaults(), ...gouvernorat };
    form.reset(
      {
        ...gouvernoratRawValue,
        id: { value: gouvernoratRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GouvernoratFormDefaults {
    return {
      id: null,
    };
  }
}
