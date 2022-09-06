import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Archives, Customer, CustomerOut} from '../models';
import {ArchivesRepository, CustomerRepository} from '../repositories';

@authenticate('jwt')
export class Customers {
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
    @repository(ArchivesRepository)
    public archivesRepository: ArchivesRepository,
  ) {}

  @post('/customers')
  @response(200, {
    description: 'Customer model instance',
    content: {'application/json': {schema: getModelSchemaRef(CustomerOut)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomer',
            exclude: ['id'],
          }),
        },
      },
    })
    customer: Omit<Customer, 'id'>,
  ): Promise<CustomerOut> {
    const retorno: CustomerOut = new CustomerOut();
    const customerCorrente = await this.customerRepository.create(customer);
    retorno.customer_id = customerCorrente.id;
    return retorno;
  }

  @get('/customers/{id}')
  @response(200, {
    description: 'Customer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Customer, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Customer> {
    return this.customerRepository.findById(id);
  }

  @put('/customers/{id}/archives')
  @response(204, {
    description: 'Archives PUT success',
  })
  async replaceByCategoriaId(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Archives, {
            title: 'PutCategoriaArchives',
            exclude: ['id', 'customer_id'],
          }),
        },
      },
    })
    archives: Archives,
  ): Promise<void> {
    const archivesGetId = await this.archivesRepository.findOne({
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        customer_id: id,
      },
    });
    if (archivesGetId?.id) {
      await this.archivesRepository.replaceById(archivesGetId.id, archives);
    }
  }

  @put('/customers/{id}')
  @response(204, {
    description: 'Customer PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() customer: Customer,
  ): Promise<void> {
    await this.customerRepository.replaceById(id, customer);
  }
}
