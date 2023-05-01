import { ICategorietarif, NewCategorietarif } from './categorietarif.model';

export const sampleWithRequiredData: ICategorietarif = {
  id: '707ab85b-c0aa-4080-aa2b-6d7322ebb5d1',
  name: 'Generic invoice digital',
};

export const sampleWithPartialData: ICategorietarif = {
  id: 'fe6ad8b6-978e-4aac-a945-7fa06c4c82d3',
  name: 'Rhode',
};

export const sampleWithFullData: ICategorietarif = {
  id: '9c7cdd94-3d93-4100-9be5-86387d98c7f4',
  name: "Pa'anga payment",
};

export const sampleWithNewData: NewCategorietarif = {
  name: 'reboot',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
