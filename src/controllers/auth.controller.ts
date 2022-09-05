import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  getModelSchemaRef,
  HttpErrors,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  UserServiceBindings,
} from '../keys';
import {Credentials, FirebaseToken, Token} from '../models';
import {UserRepository} from '../repositories';
import {BcryptHasher, JWTService, MyUserService} from '../services';
import {User} from './../models/user.model';

export class Auth {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,

    // @inject('service.user.service')
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
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
  ): Promise<{token: string; user: User}> {
    let strTokem = '';
    let user: User;
    try {
      user = await this.userService.verifyCredentials(credentials);
      const userProfile = this.userService.convertToUserProfile(user);
      strTokem = await this.jwtService.generateToken(userProfile);
    } catch (error) {
      throw new HttpErrors.Unauthorized(`error generating token ${error}`);
    }

    return Promise.resolve({token: strTokem, user: user});
  }

  @post('/auth/sso')
  @response(200, {
    description: 'SSO  Credentials',
    content: {'application/json': {schema: getModelSchemaRef(Token)}},
  })
  async sso(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FirebaseToken, {
            title: 'SSO',
          }),
        },
      },
    })
    firebaseToken: FirebaseToken,
  ): Promise<{token: string; user: User}> {
    let strTokem = '';
    let user: User;
    try {
      user = await this.userService.verifyTokenFirebaseMock(firebaseToken);
      const userProfile = this.userService.convertToUserProfile(user);
      strTokem = await this.jwtService.generateToken(userProfile);
    } catch (error) {
      throw new HttpErrors.Unauthorized(`error generating token ${error}`);
    }

    return Promise.resolve({token: strTokem, user: user});
  }
}
