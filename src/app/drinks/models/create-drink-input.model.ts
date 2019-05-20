import { DrinkOption } from './drink-option.model';
import { DrinkPrice } from './drink-price.schema';
import { ImageSource } from '../../common/image-source/image-source.model';
import { Name } from '../../common/name/name.model';

export interface CreateDrinkInput {
  id: string;
  name: Name;
  description: string;
  imgSrc: ImageSource;
  option: DrinkOption;
  price: DrinkPrice;
  drinkCategoryId?: string;
  isRecommended: boolean;
  keywords: string[];
  releasedAt?: string | Date;
  suspendedAt?: string | Date;
  retiredAt?: string | Date;
}
