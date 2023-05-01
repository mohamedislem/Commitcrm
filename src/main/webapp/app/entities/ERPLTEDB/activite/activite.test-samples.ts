import { IActivite, NewActivite } from './activite.model';

export const sampleWithRequiredData: IActivite = {
  id: '3213851a-7597-4205-99e4-da80865b3a2d',
  name: 'Georgia',
};

export const sampleWithPartialData: IActivite = {
  id: '14f6afb6-b8ef-4110-b8ee-aa9534095b4e',
  name: 'Internal Rubber',
};

export const sampleWithFullData: IActivite = {
  id: '0fbb720d-a5d0-40bc-94af-d0b76f14707b',
  name: 'Security reboot Quality',
};

export const sampleWithNewData: NewActivite = {
  name: 'Persistent Visionary multi-state',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
