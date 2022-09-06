/* eslint-disable @typescript-eslint/naming-convention */
import {Entity, model, property} from '@loopback/repository';

@model()
export class Archives extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  customer_id?: number;

  @property({
    type: 'number',
  })
  categoria_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  constructor(data?: Partial<Archives>) {
    super(data);
  }
}

export interface ArchivesRelations {
  // describe navigational properties here
}

export type ArchivesWithRelations = Archives & ArchivesRelations;
