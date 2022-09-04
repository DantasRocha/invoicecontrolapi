/* eslint-disable @typescript-eslint/naming-convention */
import {Entity, model, property} from '@loopback/repository';
import {Transaction} from './transaction.model';

@model()
export class Expense extends Transaction {
  @property({
    type: 'number',
    required: true,
  })
  categorie_id: number;

  constructor(data?: Partial<Expense>) {
    super(data);
  }
}

export interface ExpenseRelations {
  // describe navigational properties here
}

export type ExpenseWithRelations = Expense & ExpenseRelations;

@model()
export class ExpenseOut extends Entity {
  expense_id: number;
  constructor(data?: Partial<ExpenseOut>) {
    super(data);
  }
}
