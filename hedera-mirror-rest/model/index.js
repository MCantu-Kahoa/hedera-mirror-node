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

module.exports = {
  AssessedCustomFee: require('./fee/assessed-custom-fee.model.js'),
  Contract: require('./contract/contract.model'),
  ContractLog: require('./contract/contract-log.model'),
  ContractResult: require('./contract/contract-result.model'),
  ContractStateChange: require('./contract/contract-state-change.model'),
  CryptoTransfer: require('./nft/crypto-transfer.model'),
  CustomFee: require('./fee/custom-fee.model'),
  Entity: require('./entity.model'),
  FileData: require('./file/file-data.model'),
  Nft: require('./nft/nft.model'),
  NftTransfer: require('./nft/nft-transfer.model'),
  RecordFile: require('./file/record-file.model'),
  SignatureType: require('./signature-type.model'),
  Token: require('./token/token.model'),
  TokenFreezeStatus: require('./token/token-freeze-status.model'),
  TokenKycStatus: require('./token/token-kyc-status.model'),
  TokenTransfer: require('./token/token-transfer.model'),
  TopicMessage: require('./topic/topic-message.model'),
  Transaction: require('./transaction/transaction.model'),
  TransactionId: require('./transaction/transaction-id.model'),
  TransactionResult: require('./transaction/transaction-result.model'),
  TransactionType: require('./transaction/transaction-type.model'),
};
