/* eslint-disable @typescript-eslint/naming-convention */
import {Entity, model, property} from '@loopback/repository';
import {Transaction} from './transaction.model';

@model()
export class Revenue extends Transaction {
  @property({
    type: 'number',
    required: true,
  })
  invoice_id: number;

  constructor(data?: Partial<Revenue>) {
    super(data);
  }
}

@model()
export class RevenueOut extends Entity {
  revenue_id: number;
  constructor(data?: Partial<RevenueOut>) {
    super(data);
  }
}

export interface RevenueRelations {
  // describe navigational properties here
}

export type RevenueWithRelations = Revenue & RevenueRelations;
