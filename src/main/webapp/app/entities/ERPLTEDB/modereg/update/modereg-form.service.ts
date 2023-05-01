import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IModereg, NewModereg } from '../modereg.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IModereg for edit and NewModeregFormGroupInput for create.
 */
type ModeregFormGroupInput = IModereg | PartialWithRequiredKeyOf<NewModereg>;

type ModeregFormDefaults = Pick<NewModereg, 'id'>;

type ModeregFormGroupContent = {
  id: FormControl<IModereg['id'] | NewModereg['id']>;
  name: FormControl<IModereg['name']>;
  societe: FormControl<IModereg['societe']>;
};

export type ModeregFormGroup = FormGroup<ModeregFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ModeregFormService {
  createModeregFormGroup(modereg: ModeregFormGroupInput = { id: null }): ModeregFormGroup {
    const moderegRawValue = {
      ...this.getFormDefaults(),
      ...modereg,
    };
    return new FormGroup<ModeregFormGroupContent>({
      id: new FormControl(
        { value: moderegRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(moderegRawValue.name, {
        validators: [Validators.required],
      }),
      societe: new FormControl(moderegRawValue.societe),
    });
  }

  getModereg(form: ModeregFormGroup): IModereg | NewModereg {
    return form.getRawValue() as IModereg | NewModereg;
  }

  resetForm(form: ModeregFormGroup, modereg: ModeregFormGroupInput): void {
    const moderegRawValue = { ...this.getFormDefaults(), ...modereg };
    form.reset(
      {
        ...moderegRawValue,
        id: { value: moderegRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ModeregFormDefaults {
    return {
      id: null,
    };
  }
}
