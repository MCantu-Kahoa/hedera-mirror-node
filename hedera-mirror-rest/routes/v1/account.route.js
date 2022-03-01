const {Router} = require('@awaitjs/express');
const {AccountController} = require('../../controllers');

const router = Router();
const resource = 'accounts';

router.getAsync(`/`, AccountController.getAccounts);
router.getAsync(`/:accountAliasOrAccountId`, AccountController.getOneAccount);

module.exports = {
  resource,
  router,
};
