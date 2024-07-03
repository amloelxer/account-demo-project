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

cd transaction-processor
npm install 

cd client/dashboard/ 
npm install
```

Once the node modules are installed you can run the docker file (located at the server directory) which will download and run a redis client and a postgres instance

```
docker compose up -d docker-compose.yml
```

After the instances have been run, you'll need to sync the entities with the database. Generally running and creating transactions is best practice, but this is the fastest getting forward

```
// from the API directory 
npm run build // so that we have javascript output
npx typeorm schema:sync -d dist/data-source.js  
```

From there you can run any of three projects with 
```
npm run start
```

Let me know if you have any questions!






