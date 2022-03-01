const {Router} = require('@awaitjs/express');
const {BalanceController} = require('../../controllers');

const router = Router();
const resource = 'balances';

router.getAsync(`/`, BalanceController.getBalances);

module.exports = {
  resource,
  router,
};
