import {Model, model, property} from '@loopback/repository';

@model()
export class InvoiceReport extends Model {
  @property({
    type: 'number',
    required: true,
  })
  customerId: number;

  @property({
    type: 'string',
    required: true,
  })
  customerNme: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  month: number;

  constructor(data?: Partial<InvoiceReport>) {
    super(data);
  }
}
