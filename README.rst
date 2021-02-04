Testing S3 upload locally
-------------------------

Use the serverless-s3-local node modules to support unit tests and to create a
local dev environment. To start the local S3 server, use the following
command:

    yarn local-s3

This command will spin up a testing server on localhost:8001. For testing,
there's no need to start the local server. It is done automatically by
serverless-s3-local.

Test dynamodb locally
---------------------

Use dynamodb-local docker image to support unit tests. It is avaiable as a
docker-compose service:

    docker-compose up dynamodb

You can use the embed aws-cli docker image if you need to interact with the
dynamodb service:

    docker-compose run aws dynamodb list-tables --endpoint-url http://dynamodb:8000

The docker image is not set to hold any persistent data so, whenever you stop
the service, any data created would be lost. The table is auto-created by
dynamoose.

Environment variables
---------------------

Vercel allows to control the environment variables through the console or
through the CLI. Use any of these methods to define the following environment
variables:

   MEDISHARE_AWS_ACCESS_KEY_ID
   MEDISHARE_AWS_SECRET_ACCESS_KEY
   MEDISHARE_AWS_REGION_NAME

These variables have default values for local services.

For a production environment, be careful to use secrets to store the
MEDISHARE_AWS_ACCESS_KEY_ID and MEDISHARE_AWS_SECRET_ACCESS_KEY.
