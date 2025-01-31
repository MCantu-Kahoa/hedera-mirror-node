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
import {TransactionID} from '@hashgraph/proto';
import * as utils from '../utils/utils.js';

/**
 * TransactionId view model
 */
export default class TransactionIdViewModel {
  /**
   * Constructs transactionId view model from proto transaction id or TransactionId model
   *
   * @param {TransactionId|TransactionID} transactionId
   */
  constructor(transactionId) {
    if (transactionId instanceof TransactionID) {
      // handle proto format
      const {accountID, transactionValidStart, nonce, scheduled} = transactionId;
      this.account_id = EntityId.of(accountID.shardNum, accountID.realmNum, accountID.accountNum).toString();
      this.nonce = Number(nonce);
      this.scheduled = scheduled;
      this.transaction_valid_start = `${transactionValidStart.seconds}.${transactionValidStart.nanos
        .toString()
        .padStart(9, '0')}`;
    } else {
      // handle db format. Handle nil case for nonce and scheduled
      this.account_id = EntityId.parse(transactionId.payerAccountId).toString();
      this.nonce = _.isNil(transactionId.nonce) ? null : Number(transactionId.nonce);
      this.scheduled = transactionId.scheduled;
      this.transaction_valid_start = utils.nsToSecNs(transactionId.validStartTimestamp);
    }
  }
}
