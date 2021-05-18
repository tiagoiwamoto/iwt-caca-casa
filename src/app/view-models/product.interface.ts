import {UserInterface} from './user.interface';

export interface ProductInterface{
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  tagValue?: string;
  uf?: string;
  city?: string;
  createAt?: Date;
  user?: UserInterface;
}
