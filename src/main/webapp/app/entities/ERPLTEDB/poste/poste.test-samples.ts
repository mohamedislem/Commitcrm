import { IPoste, NewPoste } from './poste.model';

export const sampleWithRequiredData: IPoste = {
  id: '93bed737-6048-4511-a9b5-a0be1e8b7fde',
  code: 'Factors',
  name: 'Generic fuchsia Landing',
};

export const sampleWithPartialData: IPoste = {
  id: 'c21e5b74-95af-495d-ab1f-0b8f23384e04',
  code: 'Avon',
  name: 'primary',
};

export const sampleWithFullData: IPoste = {
  id: 'a01dfebe-61c8-46fb-a37b-f9a45920511a',
  code: 'Saint scalable SMS',
  name: 'matrix eyeballs',
};

export const sampleWithNewData: NewPoste = {
  code: 'Ball Outdoors',
  name: 'extend success morph',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
