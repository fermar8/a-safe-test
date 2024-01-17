
# A-safe test

A-safe test. Monolith with user authentication, write posts and upload images to s3 bucket functionalities.






## API URL AND SWAGGER ENDPOINT DOCS

[API URL](https://a-safe-test.onrender.com/)

[SWAGGER DOCUMENTATION](https://a-safe-test.onrender.com/documentation/static/index.html)


## Environment Variables

To run this project locally, you will need to add the following environment variables to your .env file

`DATABASE_URL`  - Your local db connection string

`PORT` - Port where you want to run the app

`JWT_SECRET` - aJwtSecret

`AWS_REGION` - Your aws region. Example: eu-west-3

`AWS_ACCESS_KEY` - Your AWS access key

`AWS_SECRET_KEY` - Your AWS secret key

`AWS_BUCKET` - Your AWS bucket


## Installation and use

Install a-safe test with npm. 
Go to the root of the project:

```bash
  npm i
```

Run the project with on dev mode with hot refresh:

```bash
  npm run dev
```

Build the project 

```bash
  npm run build
```

Start the prod ready server

```bash
  npm run start
```
    
To generate prisma client

```bash
  npm run prisma:generate:dev
```

To migrate to connected db

```bash
  npm run prisma:migrate:dev
```
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Deployment

To deploy this project merge to master and push to the [repository](https://github.com/fermar8/a-safe-test)


## Tech Stack

**Server:** Node, Fastify


## Architecture

src/api
* Routes: Acting as controller, validates the request and returns the response
* Services: Handles the logic of the application
* Repositories: Handles the db interactions
* Middleware: Functions which we run on the prehandler to validate something else than the schemas can't, for example if jwt token is valid or if user is an admin.

src/config:
* Project configurations. In this case we have the swagger config for registering the plugin to the server.

src/domain:
* Interfaces for the DTOs, the responses and the entities we have such as User and Post
* Validation schemas that we use to validate the requests done to the routes.

/ :
* Root of the project where the server is ran.

