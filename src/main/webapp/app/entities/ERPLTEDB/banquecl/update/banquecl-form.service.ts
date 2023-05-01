import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBanquecl, NewBanquecl } from '../banquecl.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBanquecl for edit and NewBanqueclFormGroupInput for create.
 */
type BanqueclFormGroupInput = IBanquecl | PartialWithRequiredKeyOf<NewBanquecl>;

type BanqueclFormDefaults = Pick<NewBanquecl, 'id'>;

type BanqueclFormGroupContent = {
  id: FormControl<IBanquecl['id'] | NewBanquecl['id']>;
  name: FormControl<IBanquecl['name']>;
  societe: FormControl<IBanquecl['societe']>;
};

export type BanqueclFormGroup = FormGroup<BanqueclFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BanqueclFormService {
  createBanqueclFormGroup(banquecl: BanqueclFormGroupInput = { id: null }): BanqueclFormGroup {
    const banqueclRawValue = {
      ...this.getFormDefaults(),
      ...banquecl,
    };
    return new FormGroup<BanqueclFormGroupContent>({
      id: new FormControl(
        { value: banqueclRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(banqueclRawValue.name, {
        validators: [Validators.required],
      }),
      societe: new FormControl(banqueclRawValue.societe),
    });
  }

  getBanquecl(form: BanqueclFormGroup): IBanquecl | NewBanquecl {
    return form.getRawValue() as IBanquecl | NewBanquecl;
  }

  resetForm(form: BanqueclFormGroup, banquecl: BanqueclFormGroupInput): void {
    const banqueclRawValue = { ...this.getFormDefaults(), ...banquecl };
    form.reset(
      {
        ...banqueclRawValue,
        id: { value: banqueclRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BanqueclFormDefaults {
    return {
      id: null,
    };
  }
}
