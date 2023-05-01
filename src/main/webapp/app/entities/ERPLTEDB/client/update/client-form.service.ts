import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IClient, NewClient } from '../client.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClient for edit and NewClientFormGroupInput for create.
 */
type ClientFormGroupInput = IClient | PartialWithRequiredKeyOf<NewClient>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IClient | NewClient> = Omit<T, 'datedebut' | 'datefin' | 'datecreation' | 'datevalidation'> & {
  datedebut?: string | null;
  datefin?: string | null;
  datecreation?: string | null;
  datevalidation?: string | null;
};

type ClientFormRawValue = FormValueOf<IClient>;

type NewClientFormRawValue = FormValueOf<NewClient>;

type ClientFormDefaults = Pick<NewClient, 'id' | 'blocage' | 'timbre' | 'datedebut' | 'datefin' | 'datecreation' | 'datevalidation'>;

type ClientFormGroupContent = {
  id: FormControl<ClientFormRawValue['id'] | NewClient['id']>;
  code: FormControl<ClientFormRawValue['code']>;
  name: FormControl<ClientFormRawValue['name']>;
  adresse: FormControl<ClientFormRawValue['adresse']>;
  typelocal: FormControl<ClientFormRawValue['typelocal']>;
  matriculef: FormControl<ClientFormRawValue['matriculef']>;
  tel: FormControl<ClientFormRawValue['tel']>;
  fax: FormControl<ClientFormRawValue['fax']>;
  regcom: FormControl<ClientFormRawValue['regcom']>;
  email: FormControl<ClientFormRawValue['email']>;
  rib: FormControl<ClientFormRawValue['rib']>;
  personnecont: FormControl<ClientFormRawValue['personnecont']>;
  photo: FormControl<ClientFormRawValue['photo']>;
  photoContentType: FormControl<ClientFormRawValue['photoContentType']>;
  srisque: FormControl<ClientFormRawValue['srisque']>;
  scredit: FormControl<ClientFormRawValue['scredit']>;
  blocage: FormControl<ClientFormRawValue['blocage']>;
  timbre: FormControl<ClientFormRawValue['timbre']>;
  regime: FormControl<ClientFormRawValue['regime']>;
  typeclient: FormControl<ClientFormRawValue['typeclient']>;
  typepatante: FormControl<ClientFormRawValue['typepatante']>;
  note: FormControl<ClientFormRawValue['note']>;
  numportable: FormControl<ClientFormRawValue['numportable']>;
  delaitreg: FormControl<ClientFormRawValue['delaitreg']>;
  numdecision: FormControl<ClientFormRawValue['numdecision']>;
  datedebut: FormControl<ClientFormRawValue['datedebut']>;
  datefin: FormControl<ClientFormRawValue['datefin']>;
  datecreation: FormControl<ClientFormRawValue['datecreation']>;
  datevalidation: FormControl<ClientFormRawValue['datevalidation']>;
  societe: FormControl<ClientFormRawValue['societe']>;
  activite: FormControl<ClientFormRawValue['activite']>;
  secteur: FormControl<ClientFormRawValue['secteur']>;
  banquecl: FormControl<ClientFormRawValue['banquecl']>;
  poste: FormControl<ClientFormRawValue['poste']>;
  modereg: FormControl<ClientFormRawValue['modereg']>;
  categorietarif: FormControl<ClientFormRawValue['categorietarif']>;
  gouvernorat: FormControl<ClientFormRawValue['gouvernorat']>;
  region: FormControl<ClientFormRawValue['region']>;
  representant: FormControl<ClientFormRawValue['representant']>;
};

export type ClientFormGroup = FormGroup<ClientFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClientFormService {
  createClientFormGroup(client: ClientFormGroupInput = { id: null }): ClientFormGroup {
    const clientRawValue = this.convertClientToClientRawValue({
      ...this.getFormDefaults(),
      ...client,
    });
    return new FormGroup<ClientFormGroupContent>({
      id: new FormControl(
        { value: clientRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      code: new FormControl(clientRawValue.code, {
        validators: [Validators.required],
      }),
      name: new FormControl(clientRawValue.name, {
        validators: [Validators.required],
      }),
      adresse: new FormControl(clientRawValue.adresse),
      typelocal: new FormControl(clientRawValue.typelocal, {
        validators: [Validators.required],
      }),
      matriculef: new FormControl(clientRawValue.matriculef),
      tel: new FormControl(clientRawValue.tel),
      fax: new FormControl(clientRawValue.fax),
      regcom: new FormControl(clientRawValue.regcom),
      email: new FormControl(clientRawValue.email),
      rib: new FormControl(clientRawValue.rib),
      personnecont: new FormControl(clientRawValue.personnecont),
      photo: new FormControl(clientRawValue.photo),
      photoContentType: new FormControl(clientRawValue.photoContentType),
      srisque: new FormControl(clientRawValue.srisque),
      scredit: new FormControl(clientRawValue.scredit),
      blocage: new FormControl(clientRawValue.blocage, {
        validators: [Validators.required],
      }),
      timbre: new FormControl(clientRawValue.timbre, {
        validators: [Validators.required],
      }),
      regime: new FormControl(clientRawValue.regime, {
        validators: [Validators.required],
      }),
      typeclient: new FormControl(clientRawValue.typeclient),
      typepatante: new FormControl(clientRawValue.typepatante),
      note: new FormControl(clientRawValue.note),
      numportable: new FormControl(clientRawValue.numportable),
      delaitreg: new FormControl(clientRawValue.delaitreg),
      numdecision: new FormControl(clientRawValue.numdecision),
      datedebut: new FormControl(clientRawValue.datedebut),
      datefin: new FormControl(clientRawValue.datefin),
      datecreation: new FormControl(clientRawValue.datecreation),
      datevalidation: new FormControl(clientRawValue.datevalidation),
      societe: new FormControl(clientRawValue.societe),
      activite: new FormControl(clientRawValue.activite),
      secteur: new FormControl(clientRawValue.secteur),
      banquecl: new FormControl(clientRawValue.banquecl),
      poste: new FormControl(clientRawValue.poste),
      modereg: new FormControl(clientRawValue.modereg),
      categorietarif: new FormControl(clientRawValue.categorietarif),
      gouvernorat: new FormControl(clientRawValue.gouvernorat),
      region: new FormControl(clientRawValue.region),
      representant: new FormControl(clientRawValue.representant),
    });
  }

  getClient(form: ClientFormGroup): IClient | NewClient {
    return this.convertClientRawValueToClient(form.getRawValue() as ClientFormRawValue | NewClientFormRawValue);
  }

  resetForm(form: ClientFormGroup, client: ClientFormGroupInput): void {
    const clientRawValue = this.convertClientToClientRawValue({ ...this.getFormDefaults(), ...client });
    form.reset(
      {
        ...clientRawValue,
        id: { value: clientRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ClientFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      blocage: false,
      timbre: false,
      datedebut: currentTime,
      datefin: currentTime,
      datecreation: currentTime,
      datevalidation: currentTime,
    };
  }

  private convertClientRawValueToClient(rawClient: ClientFormRawValue | NewClientFormRawValue): IClient | NewClient {
    return {
      ...rawClient,
      datedebut: dayjs(rawClient.datedebut, DATE_TIME_FORMAT),
      datefin: dayjs(rawClient.datefin, DATE_TIME_FORMAT),
      datecreation: dayjs(rawClient.datecreation, DATE_TIME_FORMAT),
      datevalidation: dayjs(rawClient.datevalidation, DATE_TIME_FORMAT),
    };
  }

  private convertClientToClientRawValue(
    client: IClient | (Partial<NewClient> & ClientFormDefaults)
  ): ClientFormRawValue | PartialWithRequiredKeyOf<NewClientFormRawValue> {
    return {
      ...client,
      datedebut: client.datedebut ? client.datedebut.format(DATE_TIME_FORMAT) : undefined,
      datefin: client.datefin ? client.datefin.format(DATE_TIME_FORMAT) : undefined,
      datecreation: client.datecreation ? client.datecreation.format(DATE_TIME_FORMAT) : undefined,
      datevalidation: client.datevalidation ? client.datevalidation.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
