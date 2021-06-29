<!--
title: 'Serverless Cognito Signup Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda that uses cognito for signup.'
layout: Doc
framework: v2
platform: AWS
language: nodeJS
authorLink: 'https://github.com/LabDevs-ninja'
authorName: 'José Menezes @ LabDevs.ninja'
authorAvatar: 'https://avatars.githubusercontent.com/u/2001467?s=60&v=4'
-->


# Serverless Cognito Signup Example

This template demonstrates how to deploy a NodeJS function running on AWS Lambda that uses cognito for signup.

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-node.zip file to S3 (711.23 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: aws-node
stage: dev
region: us-east-1
stack: aws-node-dev
resources: 6
functions:
  api: aws-node-dev-main
layers:
  None
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function main
```
You can also run local api with:

serverless offline

The endpoint for the signup api is /user/signup with the following payload

```json
{
  "email":"",
  "password":""
}
```
