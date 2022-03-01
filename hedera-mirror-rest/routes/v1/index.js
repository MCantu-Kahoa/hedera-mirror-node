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

const {Router} = require('@awaitjs/express');
const {router: AccountRouter, resource: AccountResource} = require('./account.route');
const {router: BalanceRouter, resource: BalanceResource} = require('./balance.route');
const {router: ContractRouter, resource: ContractResource} = require('./contract.route');
const {router: NetworkRouter, resource: NetworkResource} = require('./network.route');
const {router: ScheduleRouter, resource: ScheduleResource} = require('./schedule.route');
const {router: TokenRouter, resource: TokenResource} = require('./token.route');
const {router: TopicRouter, resource: TopicResource} = require('./topic.route');
const {router: TransactionRouter, resource: TransactionResource} = require('./transaction.route');

const router = Router();

const defaultRoutes = [
  {path: `${AccountResource}`, router: AccountRouter},
  {path: `${BalanceResource}`, router: BalanceRouter},
  {path: `${ContractResource}`, router: ContractRouter},
  {path: `${NetworkResource}`, router: NetworkRouter},
  {path: `${ScheduleResource}`, router: ScheduleRouter},
  {path: `${TokenResource}`, router: TokenRouter},
  {path: `${TopicResource}`, router: TopicRouter},
  {path: `${TransactionResource}`, router: TransactionRouter},
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

module.exports = {router};
