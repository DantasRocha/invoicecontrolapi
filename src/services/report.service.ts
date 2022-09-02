import {/* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {InvoiceReport, Invoices} from '../models';

import {ReportDbService} from './reportDb.service';

@injectable({scope: BindingScope.TRANSIENT})
export class ReportService {
  constructor(
    @service()
    public reportDb: ReportDbService,
  ) {}

  private CHAVE_PARAMETRO_VALOR_MAX_MEI = 'CHAVE_PARAMETRO_VALOR_MAX_MEI';

  private async getParameterTransactionLimitMei() {
    let valueMaxMei = 0.0;
    const valueParameter: string = await this.reportDb.getSettingByKey(
      this.CHAVE_PARAMETRO_VALOR_MAX_MEI,
    );
    if (valueParameter) {
      valueMaxMei = parseFloat(valueParameter);
    }
    return valueMaxMei;
  }

  public async getInvoicesCurrentYear(userid: number): Promise<Invoices> {
    console.log('-getInvoicesCurrentYear:', userid);
    const invoices: Invoices = new Invoices();
    invoices.invoicesLimit = await this.getParameterTransactionLimitMei();
    invoices.invoicesSum = await this.reportDb.getInvoicesCurrentYear(userid);
    if (
      invoices.invoicesLimit &&
      invoices.invoicesLimit > 0 &&
      invoices.invoicesSum &&
      invoices.invoicesSum > 0
    ) {
      invoices.invoicesRemaining =
        invoices.invoicesLimit - invoices.invoicesSum;
    } else {
      invoices.invoicesRemaining = 0.0;
    }
    return invoices;
  }

  public async getCustomerWithInvoicesThisYear(
    userid: number,
  ): Promise<InvoiceReport[]> {
    console.log('-getCustomerWithInvoicesThisYear:', userid);
    return this.reportDb.getCustomerWithInvoicesThisYear(userid);
  }
}
