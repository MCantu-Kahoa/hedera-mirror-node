const {Router} = require('@awaitjs/express');
const {TopicController} = require('../../controllers');

const router = Router();
const resource = 'topics';

router.getAsync(`/:topicId/messages`, TopicController.getTopicMessages);
router.getAsync(`/:topicId/messages/:sequenceNumber`, TopicController.getMessageByTopicAndSequenceRequest);
router.getAsync(`/messages/:consensusTimestamp`, TopicController.getMessageByConsensusTimestamp);

module.exports = {
  resource,
  router,
};
