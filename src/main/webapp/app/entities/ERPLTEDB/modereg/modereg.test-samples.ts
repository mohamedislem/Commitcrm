import { IModereg, NewModereg } from './modereg.model';

export const sampleWithRequiredData: IModereg = {
  id: '349d69b1-ce92-412e-ae9f-d2c045bab5e3',
  name: 'implement',
};

export const sampleWithPartialData: IModereg = {
  id: 'b6a204c3-4fb4-4d80-b515-2c9233bdac1f',
  name: 'calculating protocol Profit-focused',
};

export const sampleWithFullData: IModereg = {
  id: '98546835-4426-4957-a426-a08b975607e1',
  name: 'Account',
};

export const sampleWithNewData: NewModereg = {
  name: 'Center',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
