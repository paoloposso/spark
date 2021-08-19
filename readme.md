# Spark Posts API
A Spark Posts management API.

## Current Version Features
- Insert new post
- Update post by name
- Get post by name

## API Endopoints

### PUT: Update post using existing name
Example:
curl --location --request PUT 'localhost:3000/sparkpost' \
--header 'Content-Type: application/json' \
--data-raw '{
    "age": 300,
    "name": "Testb"
}'

### POST: Insert new post
Example:
curl --location --request POST 'localhost:3000/sparkpost' \
--header 'Content-Type: application/json' \
--data-raw '{
    "age": 300,
    "name": "Test"
}'

### GET: Get post by name
Example:
curl --location --request GET 'localhost:3000/sparkpost/Test'

## Execution via Docker Compose
In the root folder, execute commands ```docker-compose up``` to run the project. It will, by default, listen on localhost:3000.
The ```docker-compose.yml``` file contains two services:
### sparkpost
Will start the API service container, that will be accessible for the HTTP calls decribed before.

### mongo
Will start MongoDb container, on which sparkpost service depends.

## Unit Tests
Run ```npm test``` to run the unit tests.
Jest was used to create the unit tests for the current project, using a mocked repository, which is injected prior to execute them.

## Project structure
This section describe the project structure as well as the design decision made in this project.

### api
Contains the routes which are gonna be available to be called via http.
The ```sparkpost.js``` file, for example, contains the routes reponsible for the spark posts use cases, such as creation, update and get of these objects.
Also contains a file ```error-response.js```, that translates errors thrown by the applications into a single format with the proper http errors for each of them.
This layer also has the responsibility of injecting the mongo repository, received by the ```app.js``` file, in the business layer.

### core
Contains modules and objects that can be used by all other modules of the system, for example, the custom errors.

### infrastructure
Contains the modules, classes and functions that comunicate with external frameworks, such as database comunications and, possibly, tokenization, id creation, hashing etc.
The mocked database is also located inside of the infrastructure module.

### spark-posts
Contains the business rules related to spark posts. It also indirectly comunicates with the database.
It doesn't directly depend on the repository layer, so the repository is injected depending on the necessity on the outer layers, like as api ou tests layer.

### app.js
The startup file. Registers the middlewares and repositories, logs, databases and other injectable frameworks.
Calls the repositores injection module, which registers the routes for the application.
