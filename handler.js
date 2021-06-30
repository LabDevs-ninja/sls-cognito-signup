'use strict';
const AWS = require('aws-sdk');
const passwordValidator = require('password-validator');
const emailValidator = require("email-validator");
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const poolData = {    
  UserPoolId : process.env.POOL_ID,
  ClientId : process.env.CLIENT_ID 
};

module.exports.signup = async (event) => {

  const body = JSON.parse(event.body);
  const {username,email,password} = body;

  if(checkEmail(email) && checkPassword(password)){

    var returnData = {}

    var attributeList = buildAttributes(body);
    
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    returnData = await new Promise((resolve, reject) => {

      userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
          console.log(err);
          returnData = { 'result ' : 'fail', 'data' : err.message}
          resolve(returnData)
        }
        else
        {
          returnData = { 'result ' : 'success', 'data' : result.user}
          resolve(returnData);
        }

      });

    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: returnData
        },
      ),
    };


  }else{
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: 'Invalide email or password, Email requires (minimum length 8, numbers, special character, uppercase letters and lowercase letters)'
        },
      ),
    }
  };
}

module.exports.confirmRegistration = async (event) => {

  const body = JSON.parse(event.body);
  const {verificationCode,username} = body;

    var returnData = {}

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    var userData = {
      Username: username,
      Pool: userPool,
    };
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    returnData = await new Promise((resolve, reject) => {

      cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
        if (err) {
          resolve(err.message || JSON.stringify(err));
          return;
        }
        resolve(result);
      });

    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: returnData
        },
      ),
    };

}

module.exports.resendConfirmationCode = async (event) => {

  const body = JSON.parse(event.body);
  const {username} = body;

    var returnData = {}

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    var userData = {
      Username: username,
      Pool: userPool,
    };
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    returnData = await new Promise((resolve, reject) => {

      cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
          resolve(err.message || JSON.stringify(err));
          return;
        }
        resolve(result);
      });

    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: returnData
        },
      ),
    };

}

module.exports.auth = async (event) => {

  const body = JSON.parse(event.body);
  const {username,password} = body;

    var returnData = {}

    var authenticationData = {
      Username: username,
      Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    var userData = {
      Username: username,
      Pool: userPool,
    };
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    try{
    returnData = await new Promise((resolve, reject) =>
      cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err)
      })
    );
    }catch (e){
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: e
          },
        ),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: returnData
        },
      ),
    };

}

/**
 *  Helper methods
 */

function checkEmail(email){
  return emailValidator.validate(email);
}

function checkPassword(password){
  var schema = new passwordValidator();

  schema
  .is().min(8)                                    // Minimum length 8
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().symbols()                                // Must have at least 2 digits
  
  return schema.validate(password);
}

function buildAttributes(body){

    const {email,name,gender,birthdate,address} = body;

    const attributeList = [];

    if(name)
      attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:name}));
    if(gender)  
      attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:gender}));
    if(birthdate) //  ex. 1991-06-21
      attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:birthdate}));
    if(address)  
      attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:address}));
    if(email)
      attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email})); 

    return attributeList;  

}

    