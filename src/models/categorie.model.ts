import {Entity, model, property} from '@loopback/repository';

@model()
export class Categorie extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;


  constructor(data?: Partial<Categorie>) {
    super(data);
  }
}

export interface CategorieRelations {
  // describe navigational properties here
}

export type CategorieWithRelations = Categorie & CategorieRelations;
