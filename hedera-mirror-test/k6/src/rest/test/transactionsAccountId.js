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

import http from "k6/http";

import {TestScenarioBuilder} from '../../lib/common.js';
import {urlPrefix} from './constants.js';
import {isValidListResponse} from "./common.js";

const urlTag = '/transactions?account.id={accountId}';
const url = `${__ENV.BASE_URL}${urlPrefix}/transactions?account.id=${__ENV.DEFAULT_ACCOUNT}&limit=${__ENV.DEFAULT_LIMIT}`;

const {options, run} = new TestScenarioBuilder()
  .name('transactionsAccountId') // use unique scenario name among all tests
  .tags({url: urlTag})
  .request(() => http.get(url))
  .check('Transactions by account id OK', (r) => isValidListResponse(r, "transactions"))
  .build();

export {options, run};
