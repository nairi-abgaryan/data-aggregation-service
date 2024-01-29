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
The cache module is responsible for storing and retrieving transaction data. 
It is implemented using a fast in-memory data structure store. The cache module exposes two methods: `get` and `set`. The `get` method retrieves a transaction from the cache, and the `set` method stores a transaction in the cache. The cache module is used by the Transactions module to store and retrieve transactions. The cache module is also used by the Aggregation module to retrieve transactions for aggregation.
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

# Project Implementation Notes
## Current Implementation

In the current version of our application, I have implemented an in-memory cache mechanism. This approach was chosen for its simplicity and ease of development, allowing us to focus on the core features without the overhead of integrating external caching or database systems. The in-memory cache serves our current needs for storing aggregated transaction data, and works well under a limited scope with controlled data volume and traffic.
### Considerations for Real-World Deployment
While the in-memory cache meets our immediate requirements, it may not be suitable for a real-world production environment, particularly at scale. Here are some considerations and potential enhancements for a more robust and scalable system:

### Persistent Database:

In a production environment, using a persistent database (such as PostgreSQL, MongoDB, etc.) would be critical for storing transaction data reliably.
A database ensures data persistence across service restarts and crashes, which is a limitation of in-memory storage.
It also offers more advanced querying capabilities, which can be essential for efficiently processing and retrieving large volumes of data.
### Redis for Caching:

Integrating Redis as a caching layer would significantly enhance the system's performance and scalability.
Redis provides fast access to frequently read data, reducing the load on the database and improving response times.
It can handle high throughput and large data sets efficiently, which is essential for systems with a high number of transactions.
### Load Balancers and Horizontal Scaling:

In a high-traffic scenario, implementing load balancers and scaling the application horizontally (adding more instances) can help distribute the load evenly and maintain system responsiveness.
This approach, combined with Redis and a robust database, would allow the system to handle a significant increase in users and transactions.
### Data Backup and Recovery:

For production systems, implementing regular data backups and having a clear recovery plan is crucial to prevent data loss and ensure data integrity.
Automated backup mechanisms and redundant data storage solutions can be integrated to safeguard against data loss scenarios.
### Monitoring and Logging:

Implementing comprehensive monitoring and logging is essential to track the system’s health, performance, and to quickly identify and resolve issues.
Tools like Prometheus for monitoring and ELK Stack (Elasticsearch, Logstash, Kibana) for logging can be integrated for these purposes.

~~### Integration and Unit tests~~ 

