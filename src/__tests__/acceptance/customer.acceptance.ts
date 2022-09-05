import {Client, expect} from '@loopback/testlab';
import {InvoicecontrolApplication} from '../../application';
import {setupApplication} from './test-helper';

describe('customers', () => {
  let app: InvoicecontrolApplication;
  let client: Client;

  before('Customers', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /customers', async () => {
    const res = await client.get('/customers/1').expect(200);
    //client.post()
    expect(res.body).to.containEql({greeting: 'id'});
  });
});
