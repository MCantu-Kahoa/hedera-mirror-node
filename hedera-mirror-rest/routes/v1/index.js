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

import {Router} from '@awaitjs/express';
import {router as AccountRouter, resource as AccountResource} from './account.route.js';
import {router as BalanceRouter, resource as BalanceResource} from './balance.route.js';
import {router as ContractRouter, resource as ContractResource} from './contract.route.js';
import {router as NetworkRouter, resource as NetworkResource} from './network.route.js';
import {router as ScheduleRouter, resource as ScheduleResource} from './schedule.route.js';
import {router as TokenRouter, resource as TokenResource} from './token.route.js';
import {router as TopicRouter, resource as TopicResource} from './topic.route.js';
import {router as TransactionRouter, resource as TransactionResource} from './transaction.route.js';

const router = Router();

const defaultRoutes = [
  {path: `/${AccountResource}`, router: AccountRouter},
  {path: `/${BalanceResource}`, router: BalanceRouter},
  {path: `/${ContractResource}`, router: ContractRouter},
  {path: `/${NetworkResource}`, router: NetworkRouter},
  {path: `/${ScheduleResource}`, router: ScheduleRouter},
  {path: `/${TokenResource}`, router: TokenRouter},
  {path: `/${TopicResource}`, router: TopicRouter},
  {path: `/${TransactionResource}`, router: TransactionRouter},
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export {router};
