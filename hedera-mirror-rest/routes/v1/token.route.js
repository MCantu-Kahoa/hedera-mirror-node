const {Router} = require('@awaitjs/express');
const {TokenController} = require('../../controllers');

const router = Router();
const resource = 'tokens';

router.getAsync(`/`, TokenController.getTokensRequest);
router.getAsync(`/:tokenId`, TokenController.getTokenInfoRequest);
router.getAsync(`/:tokenId/balances`, TokenController.getTokenBalances);
router.getAsync(`/:tokenId/nfts`, TokenController.getNftTokensRequest);
router.getAsync(`/:tokenId/nfts/:serialNumber`, TokenController.getNftTokenInfoRequest);
router.getAsync(`/:tokenId/nfts/:serialNumber/transactions`, TokenController.getNftTransferHistoryRequest);

module.exports = {
  resource,
  router,
};
