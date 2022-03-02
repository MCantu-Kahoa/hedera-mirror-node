import {Router} from '@awaitjs/express';
import {AccountController} from '../../controllers/index.js';

const router = Router();
const resource = 'accounts';

router.getAsync(`/`, AccountController.getAccounts);
router.getAsync(`/:accountAliasOrAccountId`, AccountController.getOneAccount);

export {
  resource,
  router,
};
