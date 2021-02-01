Testing S3 upload locally
-------------------------

We use serverless-s3-local node modules to support unit tests and to create a
local test environment. To start the local S3 server, use the following
command:

    yarn local-s3

Test dynamodb locally
---------------------

We use dynamodb-local docker image to support unit tests:

    docker-compose up dynamodb

You can use the embed aws-cli docker image if needed:

    docker-compose run aws dynamodb list-tables --endpoint-url http://dynamodb:8000

To create a table:

   docker-compose run aws dynamodb create-table \
      --endpoint-url http://dynamodb:8000 \
      --cli-input-yaml file:///aws/create-table.yml
