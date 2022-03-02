import {Router} from '@awaitjs/express';
import {TopicController} from '../../controllers/index.js';

const router = Router();
const resource = 'topics';

router.getAsync(`/:topicId/messages`, TopicController.getTopicMessages);
router.getAsync(`/:topicId/messages/:sequenceNumber`, TopicController.getMessageByTopicAndSequenceRequest);
router.getAsync(`/messages/:consensusTimestamp`, TopicController.getMessageByConsensusTimestamp);

export {
  resource,
  router,
};
