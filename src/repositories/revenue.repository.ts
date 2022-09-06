import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Revenue, RevenueRelations} from '../models/revenue.model';

export class RevenueRepository extends DefaultCrudRepository<
  Revenue,
  typeof Revenue.prototype.id,
  RevenueRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Revenue, dataSource);
  }
}
