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
import {ReturnUser, User} from '../models';
import {UserRepository} from '../repositories';

import {authenticate} from '@loopback/authentication';
@authenticate('jwt')
export class Users {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(ReturnUser)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    userNew: Omit<User, 'id'>,
  ): Promise<ReturnUser> {
    const returnUser: ReturnUser = new ReturnUser();
    returnUser.user_id = 0;
    const user = await this.userRepository.create(userNew);
    if (user?.id) {
      returnUser.user_id = user.id;
    }
    return returnUser;
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (user) {
      user.password = '';
    }
    return user;
  }

  @put('/users/{id}')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }
}
