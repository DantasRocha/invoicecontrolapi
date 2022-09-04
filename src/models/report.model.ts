/* eslint-disable @typescript-eslint/naming-convention */
import {Model, model, property} from '@loopback/repository';

@model()
export class RevenueIn extends Model {
  @property({
    type: 'number',
  })
  user_id: number;

  @property({
    type: 'number',
  })
  fiscal_year: number;

  constructor(data?: Partial<RevenueIn>) {
    super(data);
  }
}

@model()
export class TotalRevenue extends Model {
  @property({
    type: 'number',
    required: true,
  })
  total_revenue: number;

  @property({
    type: 'number',
    required: true,
  })
  max_revenue_amount: number;

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  constructor(data?: Partial<TotalRevenue>) {
    super(data);
    this.total_revenue = 0;
    this.max_revenue_amount = 0;
  }
}

@model()
export class RevenueMonthItem extends Model {
  @property({
    type: 'number',
  })
  month: number;
  @property({
    type: 'string',
  })
  month_name: string;

  @property({
    type: 'number',
  })
  month_revenue: number;

  constructor(data?: Partial<RevenueMonthItem>) {
    super(data);
  }
}

export class RevenueMonthItemTemp extends Model {
  transaction_month: number;
  sum_amount: number;
}

export class RevenueCustomerItemTemp extends Model {
  customer_id: number;
  customer_name: string;
  sum_amount: number;
}

@model()
export class RevenueCustomerItem extends Model {
  @property({
    type: 'number',
  })
  customer_id: number;
  @property({
    type: 'string',
  })
  customer_name: string;

  @property({
    type: 'number',
  })
  revenue: number;

  constructor(data?: Partial<RevenueCustomerItem>) {
    super(data);
  }
}

@model()
export class RevenueCustomer extends Model {
  @property({
    type: 'object',
  })
  revenue: RevenueCustomerItem[];

  @property({
    type: 'number',
  })
  max_revenue_amount: number;

  constructor(data?: Partial<RevenueCustomer>) {
    super(data);
  }
}

@model()
export class RevenueMonth extends Model {
  @property({
    type: 'object',
  })
  revenue: RevenueMonthItem[];

  @property({
    type: 'number',
  })
  max_revenue_amount: number;

  constructor(data?: Partial<RevenueMonth>) {
    super(data);
  }
}
