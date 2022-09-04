import {RevenueCustomerItemTemp} from './../models/report.model';
/* eslint-disable @typescript-eslint/naming-convention */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {RevenueMonth} from '../models';
import {
  RevenueCustomer,
  RevenueCustomerItem,
  RevenueMonthItem,
  RevenueMonthItemTemp,
} from '../models/report.model';
import {RevenueRepository, SettingRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ReportDbService {
  constructor(
    @repository(SettingRepository)
    private settingRepository: SettingRepository,
    @repository(RevenueRepository)
    private revenueRepository: RevenueRepository,
  ) {}

  public async getSetting(): Promise<number> {
    let retorno = 0;
    const param = await this.settingRepository.findOne();
    if (param) {
      retorno = param.max_revenue_amount;
    }
    return retorno;
  }

  public async getTotalRevenueByYearAndUserId(
    userid: number,
    fiscalYear: number,
  ): Promise<number> {
    let retorno = 0.0;

    const strQuery = `SELECT sum(amount)as amount
                      FROM revenue
                      where user_id=$1 and
                       date_part('year', transaction_date) = $2`;

    try {
      const result = await this.revenueRepository.execute(strQuery, [
        userid,
        fiscalYear,
      ]);

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

  private getMonthName(mes: number): string {
    if (mes > 0 && mes < 13) {
      const date = new Date(2022, mes, 1); // 2009-11-10
      return date.toLocaleString('default', {month: 'long'});
    }
    return '';
  }

  public async getRevenueByMonthAndUserId(
    userid: number,
    fiscalYear: number,
  ): Promise<RevenueMonth> {
    const revenueMonth: RevenueMonth = new RevenueMonth();
    revenueMonth.revenue = [];
    revenueMonth.max_revenue_amount = 0;

    const strQuery = `SELECT   date_part('month', transaction_date) as transaction_month,
                      sum(amount) as sum_amount
                      FROM revenue
                      where user_id=$1
                      and date_part('year', transaction_date) = $2
                      group by transaction_month`;

    try {
      const result = await this.revenueRepository.execute(strQuery, [
        userid,
        fiscalYear,
      ]);

      if (result !== undefined && result.length > 0) {
        console.log('-getRevenueByMonthAndUserId:', result);
        let revenueItem: RevenueMonthItem = new RevenueMonthItem();
        result.forEach((item: RevenueMonthItemTemp) => {
          revenueItem = new RevenueMonthItem();
          revenueItem.month = item.transaction_month;
          revenueItem.month_name = this.getMonthName(item.transaction_month);
          revenueItem.month_revenue = item.sum_amount;
          revenueMonth.max_revenue_amount =
            revenueMonth.max_revenue_amount + revenueItem.month_revenue;
          revenueMonth.revenue.push(revenueItem);
        });
      }
    } catch (error) {
      console.log('-erro:', error);
    }

    return revenueMonth;
  }

  public async getRevenueByCustomerAndUserId(
    userid: number,
    fiscalYear: number,
  ): Promise<RevenueCustomer> {
    const revenueCustomer: RevenueCustomer = new RevenueCustomer();
    revenueCustomer.max_revenue_amount = 0;

    const strQuery = ` SELECT customer_id as customerId,customer.comercial_name as customer_name,
                       sum(amount) as sum_amount
                       FROM revenue inner join customer on revenue.customer_id=customer.id
                       and revenue.user_id= customer_id
                       where revenue.user_id=$1
                       and date_part('year', transaction_date) = $2
                       group by customerId,customer_name
                       order by customer_name;`;

    try {
      const result = await this.revenueRepository.execute(strQuery, [
        userid,
        fiscalYear,
      ]);

      if (result !== undefined && result.length > 0) {
        console.log('-getRevenueByCustomer:', result);
        let revenue: RevenueCustomerItem = new RevenueCustomerItem();
        revenueCustomer.revenue = [];
        revenueCustomer.max_revenue_amount = 0;
        result.forEach((item: RevenueCustomerItemTemp) => {
          revenue = new RevenueCustomerItem();
          revenue.customer_id = item.customer_id;
          revenue.customer_name = item.customer_name;
          revenue.revenue = item.sum_amount;
          revenueCustomer.revenue.push(revenue);
          revenueCustomer.max_revenue_amount =
            revenueCustomer.max_revenue_amount + revenue.revenue;
        });
      }
    } catch (error) {
      console.log('-erro:', error);
    }

    return revenueCustomer;
  }
}
