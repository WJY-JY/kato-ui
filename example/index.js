import {Kato} from 'kato-server';
import {KatoUI} from '../middleware';
import test from './test'
import test1 from './test1'
import test2 from './test2'
import test3 from './test3'

(async () => {
  const kato = new Kato();
  kato.use(KatoUI);
  kato.load(test);
  kato.load(test1);
  kato.load(test2);
  kato.load(test3);
  // module.hot.accept('./test', () => kato.load(test));
  await kato.listen(3000);
  console.log('listening on 3000...');
})();
