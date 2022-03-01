const {Router} = require('@awaitjs/express');
const {TransactionController, StateproofController} = require('../../controllers');
const config = require('../../config');
const {isTestEnv} = require('../../utils/utils');

const router = Router();
const resource = 'transactions';

router.getAsync(`/`, TransactionController.getTransactions);
router.getAsync(`/:transactionId`, TransactionController.getTransactionsById);

// stateproof route
if (config.stateproof.enabled || isTestEnv()) {
  // logger.info('stateproof REST API is enabled, install handler');
  router.getAsync(`/:transactionId/stateproof`, StateproofController.getStateProofForTransaction);
} else {
  // logger.info('stateproof REST API is disabled');
}

module.exports = {
  resource,
  router,
};
