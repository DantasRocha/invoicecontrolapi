/* eslint-disable @typescript-eslint/naming-convention */
import {Entity, model, property} from '@loopback/repository';

@model()
export class Transaction extends Entity {
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
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'date',
    required: true,
  })
  accrual_date: string;

  @property({
    type: 'date',
    required: true,
  })
  transaction_date: string;

  @property({
    type: 'number',
    required: true,
  })
  user_id: number;

  @property({
    type: 'number',
    required: true,
  })
  customer_id?: number;

  protected constructor(data?: Partial<Transaction>) {
    super(data);
  }
}
