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

```http
user/signup
user/confirmRegistration
user/resendConfirmationCode
user/auth
user/isauth
```

## Dependencias

node
npm
awscli
```bash
npm i aws-cli
```

serverless 
```bash
npm install -g serverless
```

## Usage

### Setup

```yml
org: [[SLS_ORG_NAME]] # this is the org name in your serverless.com account in your serverless.com account
app: [[SLS_APP_NAME]] # this is the org name in your serverless.com account in your serverless.com account
service: [[SLS_SERVICE_NAME]] # this is the service name for the function

environment:
  POOL_ID: [[COGNITO_POOL_ID]] # this is the cognito pool id in you aws account
  CLIENT_ID: [[COGNITO_CLIENT_ID]] # this is the client id for the cognito user pool in your aws account

authorizer:
    arn: [[COGNITO_POOL_ID]] #Ex.( arn:aws:cognito-idp:us-east-1:[[{{FILL}}]]:userpool/us-east-1_[[{{FILL}}]] )
```

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
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

After running offline, you should see output similar to:

```bash
   ┌──────────────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                          │
   │   POST | http://localhost:3000/dev/user/signup                                           │
   │   POST | http://localhost:3000/dev/user/confirmRegistration                              │
   │   POST | http://localhost:3000/dev/user/resendConfirmationCode                           │
   │   POST | http://localhost:3000/dev/user/auth                                             │
   │   POST | http://localhost:3000/dev/user/isauth                                           │
   │                                                                                          │     
   └──────────────────────────────────────────────────────────────────────────────────────────┘
```

The endpoint for the signup api is /user/signup with the following payload

```json
{
    "username":"",
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

The endpoint for the signup api is /user/resendConfirmationCode  with the following payload

```json
{
    "username":""
}
```


The endpoint for the signup api is /user/auth  with the following payload

```json
{
    "username":"",
    "password":""
}
```

The endpoint for the signup api is /user/isauth  with the following payload

```yml
BEARER_TOKEN : JWT
```
