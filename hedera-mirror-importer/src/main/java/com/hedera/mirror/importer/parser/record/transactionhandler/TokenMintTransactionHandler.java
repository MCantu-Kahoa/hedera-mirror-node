package com.hedera.mirror.importer.parser.record.transactionhandler;

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

import com.hederahashgraph.api.proto.java.ContractFunctionResult;
import javax.inject.Named;
import lombok.AllArgsConstructor;
import org.apache.commons.codec.binary.Hex;

import com.hedera.hashgraph.sdk.ContractFunctionParameters;
import com.hedera.mirror.common.domain.contract.ContractResult;
import com.hedera.mirror.common.domain.entity.EntityId;
import com.hedera.mirror.common.domain.transaction.RecordItem;
import com.hedera.mirror.common.domain.transaction.Transaction;
import com.hedera.mirror.common.domain.transaction.TransactionType;
import com.hedera.mirror.common.util.DomainUtils;
import com.hedera.mirror.importer.domain.EntityIdService;
import com.hedera.mirror.importer.parser.record.entity.EntityProperties;

@AllArgsConstructor
@Named
class TokenMintTransactionHandler implements TransactionHandler {

    protected final EntityIdService entityIdService;
    protected final EntityProperties entityProperties;

    @Override
    public ContractResult getContractResult(Transaction transaction, RecordItem recordItem) {
        if (entityProperties.getPersist().isContracts() && recordItem.getRecord().hasContractCallResult()) {

            var functionResult = recordItem.getRecord().getContractCallResult();
            if (functionResult != ContractFunctionResult.getDefaultInstance() && functionResult.hasContractID()) {
                ContractResult contractResult = new ContractResult();
                contractResult.setConsensusTimestamp(recordItem.getConsensusTimestamp());
                contractResult.setContractId(entityIdService.lookup(functionResult.getContractID()));
                contractResult.setPayerAccountId(transaction.getPayerAccountId());

                // amount, gasLimit and functionParameters are missing from proto. Generate missing values
                contractResult.setAmount(0L); // precompile Mint amount is always 0
                var transactionBody = recordItem.getTransactionBody().getTokenMint();
                var contractFunctionParameters = new ContractFunctionParameters()
                        .addAddress(Hex
                                .encodeHexString(DomainUtils.toEvmAddress(EntityId.of(functionResult.getContractID()))))
                        .addUint64(transactionBody.getAmount());

                if (transactionBody.getMetadataCount() > 0) {
                    contractFunctionParameters.addBytes(transactionBody.getMetadata(0).toByteArray());
                }

                contractResult.setFunctionParameters(contractFunctionParameters
                        .toBytes("mintToken")
                        .toByteArray());

                return contractResult;
            }
        }

        return null;
    }

    @Override
    public EntityId getEntity(RecordItem recordItem) {
        return EntityId.of(recordItem.getTransactionBody().getTokenMint().getToken());
    }

    @Override
    public TransactionType getType() {
        return TransactionType.TOKENMINT;
    }
}
