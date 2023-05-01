import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';

export interface IBanquecl {
  id: string;
  name?: string | null;
  societe?: Pick<ISociete, 'id' | 'code'> | null;
}

export type NewBanquecl = Omit<IBanquecl, 'id'> & { id: null };
