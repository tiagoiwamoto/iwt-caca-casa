import {ProductInterface} from './product.interface';

export interface ProductImageInterface{
  id?: number;
  url?: string;
  product?: ProductInterface;
}
