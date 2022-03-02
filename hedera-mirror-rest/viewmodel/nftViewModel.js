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

import * as utils from '../utils/utils.js'
import * as EntityId from '../entityId.js'

/**
 * NFT view model
 */
class NftViewModel {
  constructor(nftModel) {
    this.account_id = EntityId.parse(nftModel.accountId, true).toString();
    this.created_timestamp = utils.nsToSecNs(nftModel.createdTimestamp);
    this.deleted = nftModel.deleted;
    this.metadata = utils.encodeBase64(nftModel.metadata);
    this.modified_timestamp = utils.nsToSecNs(nftModel.modifiedTimestamp);
    this.serial_number = Number(nftModel.serialNumber);
    this.token_id = EntityId.parse(nftModel.tokenId).toString();
  }
}

export default {NftViewModel};
