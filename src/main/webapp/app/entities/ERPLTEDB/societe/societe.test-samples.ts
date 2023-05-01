import dayjs from 'dayjs/esm';

import { ISociete, NewSociete } from './societe.model';

export const sampleWithRequiredData: ISociete = {
  id: '87b07b0e-690d-4147-b645-4e6a61eaef31',
  code: 'Spain Berkshire Vietnam',
  name: 'repurpose',
};

export const sampleWithPartialData: ISociete = {
  id: '54ec4dc1-6f80-4e59-94bb-a964a0ea2300',
  code: 'killer radical New',
  name: 'Yen Toys web-readiness',
  datecreation: dayjs('2023-02-26T19:26'),
  matriculef: 'array networks',
  adresse: 'synthesize Coordinator',
  tel: 'Arizona',
  contact: 'Frozen Shoal',
  portable: 'Frozen architectures',
  codeposte: 'monitoring',
  activite: 'Cambridgeshire compress Corporate',
};

export const sampleWithFullData: ISociete = {
  id: '5e877a4c-12f3-4834-8a43-7158ec73ecd5',
  code: 'bottom-line hierarchy',
  name: 'quantifying Gorgeous Ville',
  datecreation: dayjs('2023-02-26T13:12'),
  matriculef: 'parsing Herzegovina circuit',
  adresse: 'Senior',
  tel: 'SCSI',
  fax: 'payment whiteboard',
  contact: 'Infrastructure innovate',
  portable: 'Credit',
  ville: 'incubate Up-sized',
  codeposte: 'Metal killer methodologies',
  activite: 'compress Fish',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
};

export const sampleWithNewData: NewSociete = {
  code: 'Practical',
  name: 'Stand-alone Gorgeous Generic',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
