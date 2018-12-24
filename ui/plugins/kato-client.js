import {KatoClient} from "kato-client";
import {db} from './database';

export async function getAPIClient(apiUrl) {
  const client = new KatoClient(apiUrl);
  await client.init();
  client.use(async function (ctx, next) {
    const headers = await db.get('headers').value();
    headers.forEach(it => ctx.req.headers[it.key] = it.value);
    await next();
  });

  const res = await client.dispatcher({url: client.baseUrl + 'stub-api.json'});
  client.validate = JSON.parse(res.data);

  return {
    install(Vue) {
      Vue.prototype.$api = client;
    }
  }
}
