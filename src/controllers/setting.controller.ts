import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Setting} from '../models';
import {SettingRepository} from '../repositories';

export class Settings {
  constructor(
    @repository(SettingRepository)
    public settingRepository: SettingRepository,
  ) {}

  @get('/settings')
  @response(200, {
    description: 'Setting model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Setting, {includeRelations: true}),
      },
    },
  })
  async findById(): Promise<Setting> {
    let setting: Setting = new Setting();
    const settingList = await this.settingRepository.find();
    if (settingList && settingList.length > 0 && settingList[0]) {
      setting = settingList[0];
    }
    return setting;
  }

  @put('/settings')
  @response(204, {
    description: 'Setting PUT success',
  })
  async replaceById(@requestBody() setting: Setting): Promise<void> {
    await this.settingRepository.replaceById(1, setting);
  }
}
