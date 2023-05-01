import { modevisite } from 'app/entities/enumerations/modevisite.model';

import { IRepresentant, NewRepresentant } from './representant.model';

export const sampleWithRequiredData: IRepresentant = {
  id: 'ee936063-8c6c-4557-a91d-1cbf8bfa92d5',
  name: 'IB invoice Rubber',
};

export const sampleWithPartialData: IRepresentant = {
  id: '453e322e-f386-42ea-9b9c-8cf89fa0cfac',
  name: 'infomediaries',
  modevisite: modevisite['TRIMESTRIEL'],
  nbvisite: 22692,
};

export const sampleWithFullData: IRepresentant = {
  id: '47637c08-3d4a-49e4-b907-94c857ec8e78',
  name: 'functionalities',
  modevisite: modevisite['TRIMESTRIEL'],
  nbvisite: 31756,
};

export const sampleWithNewData: NewRepresentant = {
  name: 'Plastic adapter indexing',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
