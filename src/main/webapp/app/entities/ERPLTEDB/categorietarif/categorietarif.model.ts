import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';

export interface ICategorietarif {
  id: string;
  name?: string | null;
  societe?: Pick<ISociete, 'id' | 'code'> | null;
}

export type NewCategorietarif = Omit<ICategorietarif, 'id'> & { id: null };
