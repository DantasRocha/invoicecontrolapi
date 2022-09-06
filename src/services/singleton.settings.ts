import {SettingRepository} from '../repositories';

export class SingletonSetting {
  private static instance: SingletonSetting;
  private constructor() {}
  public static getInstance(): SingletonSetting {
    if (!SingletonSetting.instance) {
      SingletonSetting.instance = new SingletonSetting();
    }
    return SingletonSetting.instance;
  }

  public async getParameterTransactionLimitMei(
    settingRepository: SettingRepository,
  ) {
    let valueMaxMei = 0.0;
    const param = await settingRepository.findOne();
    if (param) {
      valueMaxMei = param.max_revenue_amount;
    }
    return valueMaxMei;
  }
}
