import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {Credentials, FirebaseToken, User} from '../models';
import {UserRepository} from '../repositories/user.repository';
import {BcryptHasher} from './hash.password';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
  ) {}
  async verifyCredentials(credentials: Credentials): Promise<User> {
    credentials.email = credentials.email.trim().toLowerCase();
    const foundUser = await this.userRepository.findOne({
      where: {
        email: credentials.email,
      },
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound('user not found');
    }
    const passwordMatchedSimples = credentials.password === foundUser.password;

    const passwordMatchedCripto = await this.hasher.comparePassword(
      credentials.password,
      foundUser.password,
    );
    if (!passwordMatchedSimples && !passwordMatchedCripto)
      throw new HttpErrors.Unauthorized('password is not valid');

    foundUser.password = '';
    return foundUser;
  }
  convertToUserProfile(user: User): UserProfile {
    let userName = '';
    if (user.name) userName = user.name;

    return {
      [securityId]: user.id!.toString(),
      name: userName,
      id: user.id,
      email: user.email,
    };
    // throw new Error('Method not implemented.');
  }

  async verifyTokenFirebaseMock(firebaseToken: FirebaseToken): Promise<User> {
    if (!firebaseToken || !firebaseToken.token || firebaseToken.token === '') {
      throw new HttpErrors.Unauthorized('password is not valid');
    }

    //TODO: Check tolken firebase

    const foundUser = await this.userRepository.findOne();
    if (!foundUser || !foundUser.id) {
      throw new HttpErrors.NotFound('user not found');
    }

    return foundUser;
  }
}
