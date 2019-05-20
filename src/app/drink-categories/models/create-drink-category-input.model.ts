import { Name } from '../../common/name/name.model';

export interface CreateDrinkCategoryInput {
  id: string;
  name: Name;
  description: string;
  releasedAt?: string | Date;
  suspendedAt?: string | Date;
  retiredAt?: string | Date;
}
