import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRepresentant, NewRepresentant } from '../representant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRepresentant for edit and NewRepresentantFormGroupInput for create.
 */
type RepresentantFormGroupInput = IRepresentant | PartialWithRequiredKeyOf<NewRepresentant>;

type RepresentantFormDefaults = Pick<NewRepresentant, 'id'>;

type RepresentantFormGroupContent = {
  id: FormControl<IRepresentant['id'] | NewRepresentant['id']>;
  name: FormControl<IRepresentant['name']>;
  modevisite: FormControl<IRepresentant['modevisite']>;
  nbvisite: FormControl<IRepresentant['nbvisite']>;
  societe: FormControl<IRepresentant['societe']>;
};

export type RepresentantFormGroup = FormGroup<RepresentantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RepresentantFormService {
  createRepresentantFormGroup(representant: RepresentantFormGroupInput = { id: null }): RepresentantFormGroup {
    const representantRawValue = {
      ...this.getFormDefaults(),
      ...representant,
    };
    return new FormGroup<RepresentantFormGroupContent>({
      id: new FormControl(
        { value: representantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(representantRawValue.name, {
        validators: [Validators.required],
      }),
      modevisite: new FormControl(representantRawValue.modevisite),
      nbvisite: new FormControl(representantRawValue.nbvisite),
      societe: new FormControl(representantRawValue.societe),
    });
  }

  getRepresentant(form: RepresentantFormGroup): IRepresentant | NewRepresentant {
    return form.getRawValue() as IRepresentant | NewRepresentant;
  }

  resetForm(form: RepresentantFormGroup, representant: RepresentantFormGroupInput): void {
    const representantRawValue = { ...this.getFormDefaults(), ...representant };
    form.reset(
      {
        ...representantRawValue,
        id: { value: representantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RepresentantFormDefaults {
    return {
      id: null,
    };
  }
}
