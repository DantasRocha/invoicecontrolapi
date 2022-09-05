/* eslint-disable @typescript-eslint/naming-convention */
import {Entity, model, property} from '@loopback/repository';
import {User} from './user.model';
@model()
export class Credentials extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;
  constructor(data?: Partial<Credentials>) {
    super(data);
  }
}

@model()
export class FirebaseToken extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  token: string;
  constructor(data?: Partial<FirebaseToken>) {
    super(data);
  }
}
@model()
export class Token extends Entity {
  token: string;
  user: User;
  constructor(data?: Partial<Token>) {
    super(data);
  }
}

@model()
export class ReturnUser extends Entity {
  user_id: number;
  constructor(data?: Partial<ReturnUser>) {
    super(data);
  }
}
