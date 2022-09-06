import {
  RevenueCustomerItemTemp,
  RevenueIn,
  RevenueMonthItemTemp,
  RevenueOut,
  TypeReport,
} from '../models';
import {RevenueRepository} from '../repositories';

export interface IReport {
  getReport(
    revenueRepository: RevenueRepository,
    revenueIn: RevenueIn,
  ): Promise<RevenueOut[]>;
}

export class ReportFactory {
  public static createObject(type: TypeReport): IReport {
    if (type === TypeReport.Month) {
      return new ReportRevenueMonth();
    }
    if (type === TypeReport.Customer) {
      return new ReportRevenueCustomer();
    }
    return null as unknown as IReport;
  }
}

export class ReportRevenueMonth implements IReport {
  private getMonthName(mes: number): string {
    if (mes > 0 && mes < 13) {
      const date = new Date(2022, mes, 1); // 2009-11-10
      return date.toLocaleString('default', {month: 'long'});
    }
    return '';
  }
  public async getReport(
    revenueRepository: RevenueRepository,
    revenueIn: RevenueIn,
  ): Promise<RevenueOut[]> {
    const retorno: RevenueOut[] = [];

    const strQuery = `SELECT   date_part('month', transaction_date) as transaction_month,
                      sum(amount) as sum_amount
                      FROM revenue
                      where user_id=$1
                      and date_part('year', transaction_date) = $2
                      group by transaction_month`;

    try {
      const result = await revenueRepository.execute(strQuery, [
        revenueIn.user_id,
        revenueIn.fiscal_year,
      ]);

      if (result !== undefined && result.length > 0) {
        let revenueItem: RevenueOut = new RevenueOut();
        result.forEach((item: RevenueMonthItemTemp) => {
          revenueItem = new RevenueOut();
          revenueItem.month = item.transaction_month;
          revenueItem.month_name = this.getMonthName(item.transaction_month);
          revenueItem.month_revenue = item.sum_amount;
          retorno.push(revenueItem);
        });
      }
    } catch (error) {
      console.log('-erro:', error);
    }

    return retorno;
  }
}

export class ReportRevenueCustomer implements IReport {
  public async getReport(
    revenueRepository: RevenueRepository,
    revenueIn: RevenueIn,
  ): Promise<RevenueOut[]> {
    const retorno: RevenueOut[] = [];
    const strQuery = ` SELECT customer_id as customer_id,customer.comercial_name as customer_name,
    sum(amount) as sum_amount
    FROM revenue inner join customer on revenue.customer_id=customer.id
    and revenue.user_id= customer_id
    where revenue.user_id=$1
    and date_part('year', transaction_date) = $2
    group by customer_id,customer_name
    order by customer_name;`;

    try {
      const result = await revenueRepository.execute(strQuery, [
        revenueIn.user_id,
        revenueIn.fiscal_year,
      ]);

      if (result !== undefined && result.length > 0) {
        let revenueItem: RevenueOut = new RevenueOut();
        result.forEach((item: RevenueCustomerItemTemp) => {
          revenueItem = new RevenueOut();
          revenueItem.customer_id = item.customer_id;
          revenueItem.customer_name = item.customer_name;
          revenueItem.revenue = item.sum_amount;
          retorno.push(revenueItem);
        });
      }
    } catch (error) {
      console.log('-erro:', error);
    }

    return retorno;
  }
}
