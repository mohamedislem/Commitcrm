import { ISecteur, NewSecteur } from './secteur.model';

export const sampleWithRequiredData: ISecteur = {
  id: 'f8959f77-fd0c-46c3-a15f-2aa80f4b5157',
  name: 'Andorra',
};

export const sampleWithPartialData: ISecteur = {
  id: '5100cb8a-a11b-44e4-9a4a-b00f61740dd0',
  name: 'AGP initiatives',
};

export const sampleWithFullData: ISecteur = {
  id: '1b85627d-16c4-4ef3-974f-76e4e51c6bae',
  name: 'Brand compressing',
};

export const sampleWithNewData: NewSecteur = {
  name: 'database lavender Soft',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
