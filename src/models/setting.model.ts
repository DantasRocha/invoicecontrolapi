import {Entity, model, property} from '@loopback/repository';

@model()
export class Setting extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  key: string;
  @property({
    type: 'string',
    required: true,
  })
  value: string;

  constructor(data?: Partial<Setting>) {
    super(data);
  }
}

export interface SettingRelations {
  // describe navigational properties here
}

export type SettingWithRelations = Setting & SettingRelations;
