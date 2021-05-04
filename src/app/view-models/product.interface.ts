import {UserInterface} from './user.interface';

export interface ProductInterface{
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  tagValue?: string;
  createAt?: Date;
  user?: UserInterface;
}
