import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {InvoiceReport} from '../models';
import {RevenueRepository, SettingRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ReportDbService {
  constructor(
    @repository(SettingRepository)
    private settingRepository: SettingRepository,
    @repository(RevenueRepository)
    public revenueRepository: RevenueRepository,
  ) {}

  async getSettingByKey(key: string): Promise<string> {
    let retorno = '';
    const param = await this.settingRepository.find({where: {key}});
    if (
      param !== undefined &&
      param.length > 0 &&
      param[0].value !== undefined
    ) {
      retorno = param[0].value;
    }
    return retorno;
  }

  public async getInvoicesCurrentYear(userid: number): Promise<number> {
    let retorno = 0.0;
    //invoicing
    const strQuery = `SELECT sum(amount)as amount
                      FROM revenue
                      where date_part('year', accrual_date) = date_part('year', now())
                      and user_id=$1`;

    try {
      const result = await this.revenueRepository.execute(strQuery, [userid]);

      if (
        result !== undefined &&
        result.length > 0 &&
        result[0] &&
        result[0].amount
      ) {
        retorno = parseInt(result[0].amount);
      }
    } catch (error) {
      console.log('-erro:', error);
    }
    console.log('-retorno:', retorno);
    return retorno;
  }

  public async getCustomerWithInvoicesThisYear(
    userid: number,
  ): Promise<InvoiceReport[]> {
    const invoiceReportLst: InvoiceReport[] = [];

    const strQuery = `SELECT customer_id as customerId,customer.comercial_name as customerName, date_part('month', transaction_date) as month,   sum(amount) as amount
                        FROM expense inner join customer on expense.customer_id=customer.id
                        where date_part('year', transaction_date) = date_part('year', now())
                        and user_id=$1
                        group by customerId,month,customerName
                        order by customerId,month`;

    try {
      const result = await this.revenueRepository.execute(strQuery, [userid]);

      if (result !== undefined && result.length > 0) {
        console.log('-result2:', result);
        result.forEach((item: InvoiceReport) => {
          const invoiceReport: InvoiceReport = new InvoiceReport();
          invoiceReport.customerId = item.customerId;
          invoiceReport.customerNme = item.customerNme;
          invoiceReport.month = item.month;
          invoiceReport.amount = item.amount;
          invoiceReportLst.push(invoiceReport);
        });
      }
    } catch (error) {
      console.log('-erro:', error);
    }

    return invoiceReportLst;
  }
}
