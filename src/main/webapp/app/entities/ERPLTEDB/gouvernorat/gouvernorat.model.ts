import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';

export interface IGouvernorat {
  id: string;
  name?: string | null;
  societe?: Pick<ISociete, 'id' | 'code'> | null;
}

export type NewGouvernorat = Omit<IGouvernorat, 'id'> & { id: null };
