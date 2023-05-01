import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';

export interface IActivite {
  id: string;
  name?: string | null;
  societe?: Pick<ISociete, 'id' | 'code'> | null;
}

export type NewActivite = Omit<IActivite, 'id'> & { id: null };
