import { ISociete } from 'app/entities/ERPLTEDB/societe/societe.model';
import { modevisite } from 'app/entities/enumerations/modevisite.model';

export interface IRepresentant {
  id: string;
  name?: string | null;
  modevisite?: modevisite | null;
  nbvisite?: number | null;
  societe?: Pick<ISociete, 'id' | 'code'> | null;
}

export type NewRepresentant = Omit<IRepresentant, 'id'> & { id: null };
