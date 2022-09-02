import {Model, model, property} from '@loopback/repository';

@model()
export class Invoices extends Model {
  @property({
    type: 'number',
    required: true,
  })
  invoicesLimit: number;

  @property({
    type: 'number',
    required: true,
  })
  invoicesSum: number;

  @property({
    type: 'number',
    required: true,
  })
  invoicesRemaining: number;

  constructor(data?: Partial<Invoices>) {
    super(data);
    this.invoicesLimit = 0;
    this.invoicesSum = 0;
    this.invoicesRemaining = 0;
  }
}
