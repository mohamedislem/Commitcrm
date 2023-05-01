import { IGouvernorat } from 'app/entities/ERPLTEDB/gouvernorat/gouvernorat.model';
import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';

export interface IRegion {
  id: string;
  name?: string | null;
  gouvernorat?: Pick<IGouvernorat, 'id' | 'name'> | null;
  societe?: Pick<ISociete, 'id' | 'code'> | null;
}

export type NewRegion = Omit<IRegion, 'id'> & { id: null };
