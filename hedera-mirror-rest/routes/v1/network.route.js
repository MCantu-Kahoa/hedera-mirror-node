import {Router} from '@awaitjs/express';
import {NetworkController} from '../../controllers/index.js';

const router = Router();
const resource = 'network';

router.getAsync(`/supply`, NetworkController.getSupply);

export {
  resource,
  router,
};
