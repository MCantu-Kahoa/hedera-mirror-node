/*-
 * ‌
 * Hedera Mirror Node
 * ​
 * Copyright (C) 2019 - 2022 Hedera Hashgraph, LLC
 * ​
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ‍
 */

'use strict';

import _ from 'lodash';

import * as EntityId from '../entityId.js';
import * as utils from '../utils/utils.js';
import ChunkInfoViewModel from './ChunkInfoViewModel.js';

/**
 * Topic message view model
 */
export default class TopicMessageViewModel {
  /**
   * Constructs topicMessage view model
   *
   * @param {TopicMessage} topicMessage
   * @param {String} messageEncoding the encoding to display the message in
   */
  constructor(topicMessage, messageEncoding) {
    this.chunk_info = _.isNil(topicMessage.chunkNum) ? null : new ChunkInfoViewModel(topicMessage);
    this.consensus_timestamp = utils.nsToSecNs(topicMessage.consensusTimestamp);
    this.message = utils.encodeBinary(topicMessage.message, messageEncoding);
    this.payer_account_id = EntityId.parse(topicMessage.payerAccountId).toString();
    this.running_hash = utils.encodeBase64(topicMessage.runningHash);
    this.running_hash_version = parseInt(topicMessage.runningHashVersion);
    this.sequence_number = parseInt(topicMessage.sequenceNumber);
    this.topic_id = EntityId.parse(topicMessage.topicId).toString();
  }
}
