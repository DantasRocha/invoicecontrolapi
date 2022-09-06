import {RevenueIn, RevenueOut, TypeReport} from './../models/report.model';
/* eslint-disable @typescript-eslint/naming-convention */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {RevenueMonth} from '../models';
import {
  RevenueCustomer,
  RevenueCustomerItem,
  RevenueMonthItem,
} from '../models/report.model';
import {RevenueRepository, SettingRepository} from '../repositories';
import {IReport, ReportFactory} from './factory.report';

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
    param: RevenueIn,
  ): Promise<RevenueMonth> {
    const revenueMonth: RevenueMonth = new RevenueMonth();
    revenueMonth.revenue = [];
    revenueMonth.max_revenue_amount = 0;
    let max_revenue_amount: number = 0 as number;

    try {
      const report: IReport = ReportFactory.createObject(TypeReport.Month);
      const result = await report.getReport(this.revenueRepository, param);

      if (result !== undefined && result.length > 0) {
        let revenueItem: RevenueMonthItem = new RevenueMonthItem();
        result.forEach((item: RevenueOut) => {
          revenueItem = new RevenueMonthItem();
          revenueItem.month = item.month;
          revenueItem.month_name = this.getMonthName(item.month);
          revenueItem.month_revenue = parseFloat(item.month_revenue.toString());
          max_revenue_amount = this.sumNumber(
            parseFloat(max_revenue_amount.toString()),
            parseFloat(revenueItem.month_revenue.toString()),
          );

          revenueMonth.revenue.push(revenueItem);
        });
      }
      revenueMonth.max_revenue_amount = max_revenue_amount;
    } catch (error) {
      console.log('-erro:', error);
    }

    return revenueMonth;
  }

  private sumNumber(num1: number, num2: number): number {
    let retorno = 0.0 as number;
    retorno = (num1 + num2) as number;
    return retorno;
  }

  public async getRevenueByCustomerAndUserId(
    param: RevenueIn,
  ): Promise<RevenueCustomer> {
    const revenueCustomer: RevenueCustomer = new RevenueCustomer();
    revenueCustomer.max_revenue_amount = 0;
    let max_revenue_amount: number = 0 as number;

    try {
      const report: IReport = ReportFactory.createObject(TypeReport.Customer);
      const result = await report.getReport(this.revenueRepository, param);

      if (result !== undefined && result.length > 0) {
        let revenue: RevenueCustomerItem = new RevenueCustomerItem();
        revenueCustomer.revenue = [];
        revenueCustomer.max_revenue_amount = 0;
        result.forEach((item: RevenueOut) => {
          revenue = new RevenueCustomerItem();
          revenue.customer_id = item.customer_id;
          revenue.customer_name = item.customer_name;
          revenue.revenue = parseFloat(item.revenue.toString());
          revenueCustomer.revenue.push(revenue);
          max_revenue_amount = this.sumNumber(
            parseFloat(max_revenue_amount.toString()),
            parseFloat(revenue.revenue.toString()),
          );
        });
      }
      revenueCustomer.max_revenue_amount = max_revenue_amount as number;
    } catch (error) {
      console.log('-erro:', error);
    }

    return revenueCustomer;
  }
}
