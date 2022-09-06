/* eslint-disable @typescript-eslint/naming-convention */
import {Entity, model, property} from '@loopback/repository';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  user_id: number;

  @property({
    type: 'string',
    required: true,
  })
  cnpj: string;

  @property({
    type: 'string',
    required: true,
  })
  comercial_name: string;

  @property({
    type: 'string',
    required: true,
  })
  legal_name: string;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;

@model()
export class CustomerOut extends Entity {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  customer_id?: number;
  constructor(data?: Partial<CustomerOut>) {
    super(data);
  }
}
