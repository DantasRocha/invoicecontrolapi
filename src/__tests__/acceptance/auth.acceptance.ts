import {Client, expect} from '@loopback/testlab';
import {InvoicecontrolApplication} from '../../application';
import {setupApplication} from './test-helper';

describe('aut', () => {
  let app: InvoicecontrolApplication;
  let client: Client;

  before('aut', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /customers', async () => {
    const res = await client.get('/aut').expect(200);
    //client.post()
    expect(res.body).to.containEql({greeting: 'id'});
  });
});
