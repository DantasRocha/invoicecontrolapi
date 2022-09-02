import {service} from '@loopback/core';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {InvoiceReport, Invoices} from '../models';

import {ReportService} from '../services';

export class ReportController {
  constructor(
    @service()
    private reportService: ReportService,
  ) {}

  @get('invoices/{userid}')
  @response(200, {
    description: 'instances of Balance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Invoices, {includeRelations: true}),
      },
    },
  })
  async getInvoicesCurrentYear(
    @param.path.number('userid') userid: number,
  ): Promise<Invoices> {
    return this.reportService.getInvoicesCurrentYear(userid);
  }

  @get('/invoice-report/{userid}')
  @response(200, {
    description: 'instances of array InvoiceReport',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InvoiceReport, {includeRelations: true}),
        },
      },
    },
  })
  async getCustomerWithInvoicesThisYear(
    @param.path.number('userid') userid: number,
  ): Promise<InvoiceReport[]> {
    return this.reportService.getCustomerWithInvoicesThisYear(userid);
  }
}
