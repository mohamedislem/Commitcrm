import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';

export interface IPoste {
  id: string;
  code?: string | null;
  name?: string | null;
  societe?: Pick<ISociete, 'id' | 'code'> | null;
}

export type NewPoste = Omit<IPoste, 'id'> & { id: null };
