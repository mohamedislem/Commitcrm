import { IGouvernorat, NewGouvernorat } from './gouvernorat.model';

export const sampleWithRequiredData: IGouvernorat = {
  id: '703973f9-2226-420b-beb5-92cfa99816fb',
  name: 'Director system digital',
};

export const sampleWithPartialData: IGouvernorat = {
  id: '7dc12879-4fda-412e-8368-9ce48dcd0912',
  name: 'zero strategic',
};

export const sampleWithFullData: IGouvernorat = {
  id: 'b9c72c08-f9d4-4b96-82e0-8d4c02a741d9',
  name: 'Eritrea',
};

export const sampleWithNewData: NewGouvernorat = {
  name: 'Personal quantifying',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
