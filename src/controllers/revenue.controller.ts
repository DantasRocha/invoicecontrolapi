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

import {RevenueRepository} from '../repositories';
import {Revenue, RevenueOut} from './../models/revenue.model';

import {authenticate} from '@loopback/authentication';
@authenticate('jwt')
export class Revenues {
  constructor(
    @repository(RevenueRepository)
    public revenueRepository: RevenueRepository,
  ) {}

  @post('/revenues/{customerID}')
  @response(200, {
    description: 'Revenue model instance',
    content: {'application/json': {schema: getModelSchemaRef(RevenueOut)}},
  })
  async create(
    @param.path.number('customerID') customerId: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revenue, {
            title: 'NewRevenue',
            exclude: ['id', 'customer_id'],
          }),
        },
      },
    })
    revenue: Omit<Revenue, 'id'>,
  ): Promise<RevenueOut> {
    revenue.customer_id = customerId;
    const revenueObj = await this.revenueRepository.create(revenue);
    const revenueOut: RevenueOut = new RevenueOut();
    revenueOut.revenue_id = revenueObj.id;
    return revenueOut;
  }

  @put('/revenues/{id}')
  @response(204, {
    description: 'Revenue PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() revenue: Revenue,
  ): Promise<void> {
    await this.revenueRepository.replaceById(id, revenue);
  }

  @del('/revenues/{id}')
  @response(204, {
    description: 'Revenues DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.revenueRepository.deleteById(id);
  }
}
