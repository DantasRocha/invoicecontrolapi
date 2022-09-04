import {service} from '@loopback/core';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {
  RevenueCustomer,
  RevenueIn,
  RevenueMonth,
  TotalRevenue,
} from '../models';

import {ReportService} from '../services';

export class Reports {
  constructor(
    @service()
    private reportService: ReportService,
  ) {}

  @post('/total-revenue')
  @response(200, {
    description: 'Reports total revenue',
    content: {'application/json': {schema: getModelSchemaRef(TotalRevenue)}},
  })
  async getTotalRevenue(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevenueIn, {
            title: 'NewReports',
          }),
        },
      },
    })
    revenueIn: RevenueIn,
  ): Promise<TotalRevenue> {
    return this.reportService.getTotalRevenueByYearAndUserId(revenueIn);
  }

  @post('/revenue-by-month')
  @response(200, {
    description: 'Reports revenue by month',
    content: {'application/json': {schema: getModelSchemaRef(RevenueMonth)}},
  })
  async getRevenueByMonthAndUserId(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevenueIn, {
            title: 'NewReports',
          }),
        },
      },
    })
    revenueIn: RevenueIn,
  ): Promise<RevenueMonth> {
    return this.reportService.getRevenueByMonthAndUserId(revenueIn);
  }

  @post('/revenue-by-customer')
  @response(200, {
    description: 'Reports revenue by customer',
    content: {'application/json': {schema: getModelSchemaRef(RevenueCustomer)}},
  })
  async getRevenueByCustomerAndUserId(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevenueIn, {
            title: 'NewReports',
          }),
        },
      },
    })
    revenueIn: RevenueIn,
  ): Promise<RevenueCustomer> {
    return this.reportService.getRevenueByCustomerAndUserId(revenueIn);
  }
}
