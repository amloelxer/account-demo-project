# account-demo-project


## Overview
This is a take home project. The report about my project can be found [here](https://northern-fascinator-7d7.notion.site/Bridge-Take-Home-479a2e3b1c7741a199147a25d90e8af8).

## Dependencies
This project was created with Node.js, typescript, NPM, and Docker. I'm using the following versions 

```
Node -> v22.2.0
NPM -> v10.7.0
Typescript -> v5.4.5
Docker ->  v26.1.1
```

Once you have the necessary versions installed. You'll need to install the node modules for all the projects

```
cd api/
npm install 

cd transaction-processor/
npm install 

cd client/dashboard/ 
npm install
```

Once the node modules are installed you can run the docker file (located at the server directory) which will download and run a redis instance and a postgres instance

```
docker compose up -d docker-compose.yml
```

After the instances have been run, you'll need to sync the entities with the database. Generally running and creating migrations is best practice, but this is the fastest way to get up and running.

```
cd api/ // transfer into the API directory
npm run build // so that we have javascript output
npx typeorm schema:sync -d dist/data-source.js // create the necessary tables
```

## Testing

Once you have the necessary setup you can start both the API and the Transaction Processor in their respective directories 

```
cd api/
npm run start

cd transaction-processor/
npm run start
```

From there you can can create some basic DB entities and test by hitting the endpoint 
```
POST localhost:3001/submitTransfer

```
With a body like 
```
{
    "accountSourceId": "SOME_UUID",
    "accountDestinationId": "SOME_UUID",
    "transferAmount": 52.28
}
```

Note that you'll need to create some basic DB entities (at least two financial entities, two accounts, and one user)

But from there you'll be able to watch the job processing transactions. Let me know if you have any questions!







