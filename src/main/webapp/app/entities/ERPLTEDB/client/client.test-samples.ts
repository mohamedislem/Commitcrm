import dayjs from 'dayjs/esm';

import { typelocal } from 'app/entities/enumerations/typelocal.model';
import { regime } from 'app/entities/enumerations/regime.model';
import { typeclient } from 'app/entities/enumerations/typeclient.model';
import { typepatante } from 'app/entities/enumerations/typepatante.model';
import { note } from 'app/entities/enumerations/note.model';

import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 'b5d26ec1-78ed-413c-a418-9dee47137427',
  code: 'Human card',
  name: 'input',
  typelocal: typelocal['LOCAL'],
  blocage: true,
  timbre: false,
  regime: regime['EXPORT'],
};

export const sampleWithPartialData: IClient = {
  id: '31cbb544-3d3e-40d8-b0de-8bf54c72cd83',
  code: 'Upgradable SSL',
  name: 'Assistant paradigm Wooden',
  typelocal: typelocal['LOCAL'],
  matriculef: 'Home violet',
  regcom: 'Supervisor',
  email: 'Lucius.Oberbrunner2@gmail.com',
  rib: 'Wyoming',
  srisque: 59417,
  blocage: true,
  timbre: true,
  regime: regime['EXONORE'],
  numportable: 'Distributed',
  delaitreg: 96046,
  datedebut: dayjs('2023-02-27T03:33'),
};

export const sampleWithFullData: IClient = {
  id: 'bcaee6c4-fdc6-49aa-b70c-788a6abf5eeb',
  code: 'Future',
  name: 'Iceland withdrawal Loop',
  adresse: 'Mouse application indexing',
  typelocal: typelocal['ETRANGER'],
  matriculef: 'Direct Generic',
  tel: 'unleash wireless Christmas',
  fax: 'interface Benin De-engineered',
  regcom: 'USB redundant',
  email: 'Brielle_Welch@gmail.com',
  rib: 'Texas European',
  personnecont: 'Investment',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  srisque: 25465,
  scredit: 51243,
  blocage: true,
  timbre: true,
  regime: regime['EXONORE'],
  typeclient: typeclient['CLIENT'],
  typepatante: typepatante['CIN'],
  note: note['B'],
  numportable: 'deliverables',
  delaitreg: 26667,
  numdecision: 'Sierra e-business multi-byte',
  datedebut: dayjs('2023-02-26T22:05'),
  datefin: dayjs('2023-02-27T02:11'),
  datecreation: dayjs('2023-02-26T11:29'),
  datevalidation: dayjs('2023-02-27T06:59'),
};

export const sampleWithNewData: NewClient = {
  code: 'Lari program copy',
  name: 'Awesome connecting',
  typelocal: typelocal['LOCAL'],
  blocage: true,
  timbre: true,
  regime: regime['SUSPENDUE'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
