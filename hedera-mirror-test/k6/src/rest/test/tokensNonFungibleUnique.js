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
import {urlPrefix,tokenListName} from './constants.js';
import {isValidListResponse} from "./common.js";

const urlTag = '/tokens?type=NON_FUNGIBLE_UNIQUE';
const url = `${__ENV.BASE_URL}${urlPrefix}${urlTag}`;

const {options, run} = new TestScenarioBuilder()
  .name('tokensNonFungibleUnique') // use unique scenario name among all tests
  .tags({url: urlTag})
  .request(() => http.get(url))
  .check('Tokens NON_FUNGIBLE_UNIQUE OK', (r) => isValidListResponse(r, tokenListName))
  .build();

export {options, run};
