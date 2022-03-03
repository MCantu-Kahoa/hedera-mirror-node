import {Router} from '@awaitjs/express';
import {TransactionController, StateproofController} from '../../controllers/index.js';
import {getConfig} from '../../config.js';
import {isTestEnv} from '../../utils/utils.js';

const router = Router();
const resource = 'transactions';

router.getAsync(`/`, TransactionController.getTransactions);
router.getAsync(`/:transactionId`, TransactionController.getTransactionsById);

export {resource, router};
