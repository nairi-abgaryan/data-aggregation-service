## System Documentation
### Overview
This document describes our transaction processing system, designed to fetch, aggregate, and serve transaction data efficiently. The system consists of four primary modules: Cache, Transactions, Aggregation, and Scheduler.
### Installation

```bash
$ git@github.com:nairi-abgaryan/data-aggregation-service.git
$ cd data-aggregation-service
$ npm install
```
## Running the app

```bash
# development
$ npm run start
```
## Swagger URL
```bash
http://localhost:3000/api/docs

```

## API Examples
Fetch Aggregated Data by User ID
```bash
GET /aggregatedData/074092
```

Response:
```json
{
  "balance": 100,
  "earned": 150,
  "spent": 50,
  "payout": 30,
  "paidOut": 20
}
```

Fetch Aggregated Data by User ID
```bash
GET /aggregatedData/payouts
```

Response:
```json
[
  {
    "userId": "074092",
    "totalPayout": 30
  },
  {
    "userId": "074093",
    "totalPayout": 40
  }
]

```

## Modules Detail
### Cache
The cache module is responsible for storing and retrieving transaction data. It is implemented using Redis, a fast in-memory data structure store. Redis is a key-value store, and we use the transaction ID as the key and the transaction data as the value. The cache module exposes two methods: `get` and `set`. The `get` method retrieves a transaction from the cache, and the `set` method stores a transaction in the cache. The cache module is used by the Transactions module to store and retrieve transactions. The cache module is also used by the Aggregation module to retrieve transactions for aggregation.
### Transactions
##### Functionality: 
Fetches and processes data from the Transaction API.
#### Usage
[Activated by the Scheduler Module.
]()Stores processed data in the local Cache Module.
### Aggregation
Accesses data from the Cache Module to respond to API requests.
Functionality: Accesses data from the Cache Module to respond to API requests.

### Scheduler
Functionality: Executes every 12 seconds to initiate data fetching and processing.
### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

