import {Router} from '@awaitjs/express';
import {BalanceController} from '../../controllers/index.js';

const router = Router();
const resource = 'balances';

router.getAsync(`/`, BalanceController.getBalances);

export {
  resource,
  router,
};
