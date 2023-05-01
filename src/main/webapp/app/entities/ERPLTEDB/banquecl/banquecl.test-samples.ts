import { IBanquecl, NewBanquecl } from './banquecl.model';

export const sampleWithRequiredData: IBanquecl = {
  id: '662ad29d-d6af-4840-971e-e9205b1f10ef',
  name: '1080p',
};

export const sampleWithPartialData: IBanquecl = {
  id: 'ff01a9fd-b7bf-4658-9084-d6f27b2aa018',
  name: 'Buckinghamshire purple',
};

export const sampleWithFullData: IBanquecl = {
  id: '02ebc596-3808-4f38-8956-2aace1e61d7c',
  name: 'Car',
};

export const sampleWithNewData: NewBanquecl = {
  name: 'Home California',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
