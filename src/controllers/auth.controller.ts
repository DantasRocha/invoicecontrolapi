import {repository} from '@loopback/repository';
import {
  getModelSchemaRef,
  HttpErrors,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Credentials, FirebaseToken, Token} from '../models';
import {UserRepository} from '../repositories';

export class Auth {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/auth')
  @response(200, {
    description: 'Auth Credentials',
    content: {'application/json': {schema: getModelSchemaRef(Token)}},
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credentials, {
            title: 'login',
          }),
        },
      },
    })
    credentials: Credentials,
  ): Promise<Token> {
    const token: Token = new Token();
    credentials.email = credentials.email.trim().toLowerCase();
    const user = await this.userRepository.find({
      where: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    if (user) {
      //TODO: GENERATE JWT TOKEM
      token.token = 'tokem';
      token.user = user[0];
      token.user.password = '';
    } else {
      throw new HttpErrors.UnprocessableEntity(
        'error.Auth.Credentials.invalid',
      );
    }
    return token;
  }

  @post('/auth/sso')
  @response(200, {
    description: 'SSO Credentials',
    content: {'application/json': {schema: getModelSchemaRef(Token)}},
  })
  async sso(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FirebaseToken, {
            title: 'sso',
          }),
        },
      },
    })
    firebaseToken: FirebaseToken,
  ): Promise<Token> {
    const token: Token = new Token();
    token.token = 'tokem';

    const user = await this.userRepository.find({
      where: {
        email: 'credentials.email',
      },
    });
    if (user) {
      //TODO: GENERATE JWT TOKEM
      token.token = 'tokem';
      token.user = user[0];
      token.user.password = '';
    } else {
      throw new HttpErrors.UnprocessableEntity(
        'error.Auth.Credentials.invalid',
      );
    }

    return token;
  }
}
