import { IRegion, NewRegion } from './region.model';

export const sampleWithRequiredData: IRegion = {
  id: '4ac22173-a27f-4cc2-bff5-851da2a397e4',
  name: 'attitude Senior',
};

export const sampleWithPartialData: IRegion = {
  id: 'f6507736-4590-4ced-b746-84f1913319f7',
  name: 'deposit Berkshire',
};

export const sampleWithFullData: IRegion = {
  id: 'eb521d31-1f32-4b2c-8cab-4bda7a211c29',
  name: 'Mississippi Industrial Corporate',
};

export const sampleWithNewData: NewRegion = {
  name: 'deposit Dobra Account',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
