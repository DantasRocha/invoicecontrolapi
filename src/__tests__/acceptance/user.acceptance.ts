import {Client, expect} from '@loopback/testlab';
import {InvoicecontrolApplication} from '../../application';
import {setupApplication} from './test-helper';

describe('User', () => {
  let app: InvoicecontrolApplication;
  let client: Client;

  before('User', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /users', async () => {
    const res = await client.get('/users').expect(200);

    expect(res.body).to.containEql({greeting: 'id'});
  });
});
