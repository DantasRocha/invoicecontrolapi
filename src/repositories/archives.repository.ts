import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Archives, ArchivesRelations} from '../models';

export class ArchivesRepository extends DefaultCrudRepository<
  Archives,
  typeof Archives.prototype.id,
  ArchivesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Archives, dataSource);
  }
}
