import {repository} from '@loopback/repository';
import {
  del,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Expense, ExpenseOut} from '../models';
import {ExpenseRepository} from '../repositories';

import {authenticate} from '@loopback/authentication';
@authenticate('jwt')
export class Expenses {
  constructor(
    @repository(ExpenseRepository)
    public expenseRepository: ExpenseRepository,
  ) {}

  @post('/expenses/{categoryID}')
  @response(200, {
    description: 'Expense model instance',
    content: {'application/json': {schema: getModelSchemaRef(ExpenseOut)}},
  })
  async create(
    @param.path.number('categoryID') categorieId: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expense, {
            title: 'NewExpense',
            exclude: ['id', 'categorie_id'],
          }),
        },
      },
    })
    expense: Omit<Expense, 'id'>,
  ): Promise<ExpenseOut> {
    expense.categorie_id = categorieId;
    const expenseOut: ExpenseOut = new ExpenseOut();
    const expenseC = await this.expenseRepository.create(expense);
    expenseOut.expense_id = expenseC.id;
    return expenseOut;
  }

  @put('/expenses/{id}')
  @response(204, {
    description: 'Expense PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() expense: Expense,
  ): Promise<void> {
    await this.expenseRepository.replaceById(id, expense);
  }

  @del('/expenses/{id}')
  @response(204, {
    description: 'Expense DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.expenseRepository.deleteById(id);
  }
}
