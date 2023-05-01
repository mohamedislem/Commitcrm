import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';

export interface IModereg {
  id: string;
  name?: string | null;
  societe?: Pick<ISociete, 'id' | 'code'> | null;
}

export type NewModereg = Omit<IModereg, 'id'> & { id: null };
