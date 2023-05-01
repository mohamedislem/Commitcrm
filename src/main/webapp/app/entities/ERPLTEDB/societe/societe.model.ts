import dayjs from 'dayjs/esm';

export interface ISociete {
  id: string;
  code?: string | null;
  name?: string | null;
  datecreation?: dayjs.Dayjs | null;
  matriculef?: string | null;
  adresse?: string | null;
  tel?: string | null;
  fax?: string | null;
  contact?: string | null;
  portable?: string | null;
  ville?: string | null;
  codeposte?: string | null;
  activite?: string | null;
  photo?: string | null;
  photoContentType?: string | null;
}

export type NewSociete = Omit<ISociete, 'id'> & { id: null };
