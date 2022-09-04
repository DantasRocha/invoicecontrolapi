import {/* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {RevenueIn, RevenueMonth, TotalRevenue} from '../models';
import {RevenueCustomer} from './../models/report.model';

import {ReportDbService} from './reportDb.service';

@injectable({scope: BindingScope.TRANSIENT})
export class ReportService {
  constructor(
    @service()
    public reportDb: ReportDbService,
  ) {}

  private maxRevenueAmount = 'max_revenue_amount';

  private async getParameterTransactionLimitMei() {
    let valueMaxMei = 0.0;
    const valueParameter: number = await this.reportDb.getSetting();
    if (valueParameter) {
      valueMaxMei = valueParameter;
    }
    return valueMaxMei;
  }

  private validarRevenueIn(revenueIn: RevenueIn): RevenueIn {
    if (!RevenueIn) {
      revenueIn.fiscal_year = new Date().getFullYear();
      revenueIn.user_id = 0;
    }
    if (!revenueIn.fiscal_year || revenueIn.fiscal_year === 0) {
      revenueIn.fiscal_year = new Date().getFullYear();
    }
    if (!revenueIn.user_id) {
      revenueIn.user_id = 0;
    }
    return revenueIn;
  }

  public async getTotalRevenueByYearAndUserId(
    revenueIn: RevenueIn,
  ): Promise<TotalRevenue> {
    console.log('-getRevenueByMonthAndUserId:', revenueIn);
    const totalRevenue: TotalRevenue = new TotalRevenue();
    revenueIn = this.validarRevenueIn(revenueIn);
    totalRevenue.max_revenue_amount =
      await this.getParameterTransactionLimitMei();
    totalRevenue.total_revenue =
      await this.reportDb.getTotalRevenueByYearAndUserId(
        revenueIn.user_id,
        revenueIn.fiscal_year,
      );
    totalRevenue.balance =
      totalRevenue.max_revenue_amount - totalRevenue.total_revenue;

    return totalRevenue;
  }

  public async getRevenueByMonthAndUserId(
    revenueIn: RevenueIn,
  ): Promise<RevenueMonth> {
    console.log('-getRevenueByMonthAndUserId:', revenueIn);
    revenueIn = this.validarRevenueIn(revenueIn);
    return this.reportDb.getRevenueByMonthAndUserId(
      revenueIn.user_id,
      revenueIn.fiscal_year,
    );
  }

  public async getRevenueByCustomerAndUserId(
    revenueIn: RevenueIn,
  ): Promise<RevenueCustomer> {
    console.log('-getRevenueByCustomer:', revenueIn);
    revenueIn = this.validarRevenueIn(revenueIn);
    return this.reportDb.getRevenueByCustomerAndUserId(
      revenueIn.user_id,
      revenueIn.fiscal_year,
    );
  }
}
