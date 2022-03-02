import {Router} from '@awaitjs/express';
import {TransactionController, StateproofController} from '../../controllers/index.js';
import {getConfig} from '../../config.js';
import {isTestEnv} from '../../utils/utils.js';

const router = Router();
const resource = 'transactions';

router.getAsync(`/`, TransactionController.getTransactions);
router.getAsync(`/:transactionId`, TransactionController.getTransactionsById);

// stateproof route
if (getConfig().stateproof.enabled || isTestEnv()) {
  // logger.info('stateproof REST API is enabled, install handler');
  router.getAsync(`/:transactionId/stateproof`, StateproofController.getStateProofForTransaction);
} else {
  // logger.info('stateproof REST API is disabled');
}

export {
  resource,
  router,
};
