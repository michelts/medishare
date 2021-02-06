# MediShare

This is a project implemented for the
`[#VercelHashnode](https://townhall.hashnode.com/announcing-hashnode-hackathon-powered-by-vercel).
It is a proof of concept of several technologies as well as a test of the
Vercel's tooling.

Read the [Blog post with more details](http://sabchuk.hashnode.dev/media-sharing-application-for-medical-professionals)!

## Starting up

To start the development, use the commands below:

```
docker-compose up -d dynamodb
yarn local-s3
vercel dev
```

## Testing S3 upload locally

The project uses the serverless-s3-local node modules to support unit tests and
to create a local dev environment. To start the local S3 server, use the
following command:

```
yarn local-s3
```

This command will spin up a testing server on localhost:8001. For testing,
there's no need to start the local server. It is done automatically by
serverless-s3-local.

## Test dynamodb locally

The dynamodb-local docker image is used to support unit tests. It is avaiable
as a docker-compose service:

```
docker-compose up dynamodb
```

You can use the embed aws-cli docker image if you need to interact with the
dynamodb service:

```
docker-compose run aws dynamodb list-tables --endpoint-url http://dynamodb:8000
```

The docker image is not set to hold any persistent data so, whenever you stop
the service, any data created would be lost. The database table is auto-created
by dynamoose.

## Environment variables

Vercel allows to control the environment variables through the console or
through the CLI. Use any of these methods to define the following environment
variables:

* MEDISHARE_AWS_ACCESS_KEY_ID
* MEDISHARE_AWS_SECRET_ACCESS_KEY
* MEDISHARE_AWS_REGION_NAME

This step is needed if you want to deploy the app to Vercel. These variables
have default values for local services, so you don't need to define them for
local development.

For a production environment, be careful to use secrets to store the
MEDISHARE_AWS_ACCESS_KEY_ID and MEDISHARE_AWS_SECRET_ACCESS_KEY.

## Testing

The project includes some unit-tests. Run them with the command below:

```
docker-compose up -d dynamodb
yarn local-s3
yarn test
```
