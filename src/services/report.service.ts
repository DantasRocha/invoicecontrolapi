import {/* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {RevenueIn, RevenueMonth, TotalRevenue} from '../models';
import {SettingRepository} from '../repositories';
import {RevenueCustomer} from './../models/report.model';

import {ReportDbService} from './reportDb.service';
import {SingletonSetting} from './singleton.settings';

@injectable({scope: BindingScope.TRANSIENT})
export class ReportService {
  constructor(
    @service()
    public reportDb: ReportDbService,
    @repository(SettingRepository)
    private settingRepository: SettingRepository,
  ) {}

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
    const totalRevenue: TotalRevenue = new TotalRevenue();
    revenueIn = this.validarRevenueIn(revenueIn);
    const objSingletonSetting = SingletonSetting.getInstance();
    totalRevenue.max_revenue_amount =
      await objSingletonSetting.getParameterTransactionLimitMei(
        this.settingRepository,
      );
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
    revenueIn = this.validarRevenueIn(revenueIn);
    return this.reportDb.getRevenueByMonthAndUserId(revenueIn);
  }

  public async getRevenueByCustomerAndUserId(
    revenueIn: RevenueIn,
  ): Promise<RevenueCustomer> {
    revenueIn = this.validarRevenueIn(revenueIn);
    return this.reportDb.getRevenueByCustomerAndUserId(revenueIn);
  }
}
