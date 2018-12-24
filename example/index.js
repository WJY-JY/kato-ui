import {Kato} from 'kato-server';
import {KatoUI} from '../middleware';
import test from './test'

(async () => {
  const kato = new Kato();
  kato.use(KatoUI);
  kato.load(test);
  // module.hot.accept('./test', () => kato.load(test));
  await kato.listen(3000);
  console.log('listening on 3000...');
})();
