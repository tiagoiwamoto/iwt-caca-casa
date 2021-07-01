import {ProductNegociateMessageInterface} from './product-negociate-message-interface';

export interface ProductNegociateInterface{

  id?: string;
  userFrom?: string;
  userTo?: string;
  type?: string;
  userId?: string;
  messages?: ProductNegociateMessageInterface[];
  createdAt?: Date;

}
