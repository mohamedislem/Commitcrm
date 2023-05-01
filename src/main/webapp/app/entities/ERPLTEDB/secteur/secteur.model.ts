import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';

export interface ISecteur {
  id: string;
  name?: string | null;
  societe?: Pick<ISociete, 'id' | 'code'> | null;
}

export type NewSecteur = Omit<ISecteur, 'id'> & { id: null };
