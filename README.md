<!--
title: 'Serverless Cognito User Management'
description: 'This serverless project exposes the api's for cognito user managment.'
layout: Doc
framework: v2
platform: AWS
language: nodeJS
authorLink: 'https://github.com/LabDevs-ninja'
authorName: 'José Menezes @ LabDevs.ninja'
authorAvatar: 'https://avatars.githubusercontent.com/u/2001467?s=60&v=4'
-->


# Serverless Cognito Signup Example

This serverless project exposes the api's for cognito user managment.

## Usage

### Setup

```yml
org: [[SLS_ORG_NAME]] # this is the org name in your serverless.com account in your serverless.com account
app: [[SLS_APP_NAME]] # this is the org name in your serverless.com account in your serverless.com account
service: [[SLS_SERVICE_NAME]] # this is the service name for the function

environment:
  POOL_ID: [[COGNITO_POOL_ID]] # this is the cognito pool id in you aws account
  CLIENT_ID: [[COGNITO_CLIENT_ID]] # this is the client id for the cognito user pool in your aws account
```

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Serverless: Using provider credentials, configured via dashboard:
Serverless: Using deployment bucket 'sls-cognito-user-managment'
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Installing dependencies for custom CloudFormation resources...
Serverless: Using deployment bucket 'sls-cognito-user-managment'
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service sls-cognito-user-managment.zip file to S3 (12.94 MB)...
Serverless: Uploading custom CloudFormation resources...
Serverless: Validating template...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
................................................................................
Serverless: Stack create finished...
Service Information
service: sls-cognito-user-managment
stage: dev
region: us-east-1
stack: sls-cognito-user-managment-dev
resources: 26
api keys:
  None
endpoints:
  POST - https://bdvfua60kk.execute-api.us-east-1.amazonaws.com/dev/user/signup
  POST - https://bdvfua60kk.execute-api.us-east-1.amazonaws.com/dev/user/confirmRegistration
functions:
  signup: sls-cognito-user-managment-dev-signup
  confirmRegistration: sls-cognito-user-managment-dev-confirmRegistration
layers:
  None
Serverless: Publishing service to the Serverless Dashboard...
Serverless: Successfully published your service to the Serverless Dashboard: 
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function main
```
You can also run local api with:

```bash
serverless offline
```

After running deploy, you should see output similar to:

```bash
   ┌───────────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                       │
   │   POST | http://localhost:3000/dev/user/signup                                        │
   │   POST | http://localhost:3000/2015-03-31/functions/signup/invocations                │
   │   POST | http://localhost:3000/dev/user/confirmRegistration                           │
   │   POST | http://localhost:3000/2015-03-31/functions/confirmRegistration/invocations   │
   │                                                                                       │
   └───────────────────────────────────────────────────────────────────────────────────────┘
```

The endpoint for the signup api is /user/signup with the following payload

```json
{
  "email":"",
  "password":""
}
```

The endpoint for the signup api is /user/confirmRegistration with the following payload

```json
{
    "username":"",
    "verificationCode":""
}
```