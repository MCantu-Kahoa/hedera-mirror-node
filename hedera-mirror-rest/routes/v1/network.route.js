const {Router} = require('@awaitjs/express');
const {NetworkController} = require('../../controllers');

const router = Router();
const resource = 'network';

router.getAsync(`/supply`, NetworkController.getSupply);

module.exports = {
  resource,
  router,
};
