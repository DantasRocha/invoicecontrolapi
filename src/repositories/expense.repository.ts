import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Expense, ExpenseRelations} from '../models';

export class ExpenseRepository extends DefaultCrudRepository<
  Expense,
  typeof Expense.prototype.id,
  ExpenseRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Expense, dataSource);
  }
}
