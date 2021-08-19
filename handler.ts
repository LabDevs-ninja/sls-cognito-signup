'use strict';
import AWS from 'aws-sdk';
import passwordValidator from 'password-validator';
import emailValidator from "email-validator";
import AmazonCognitoIdentity, { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { User } from './User';
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const poolData = {    
  UserPoolId : process.env.POOL_ID,
  ClientId : process.env.CLIENT_ID 
};

module.exports.signup = async (event: { body: string; }) => {

  const body = JSON.parse(event.body);
  let user:User = Object.assign(new User(), body);

  if(checkEmail(user.email) && checkPassword(user.password)){

    var returnData = {}

    var attributeList = buildAttributes(user);
    
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    returnData = await new Promise((resolve) => {

      userPool.signUp(user.username, user.password, attributeList, null, function(err, result){
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

module.exports.confirmRegistration = async (event: { body: string; }) => {

  const body = JSON.parse(event.body);
  let user:User = Object.assign(new User(), body);

    var returnData = {}

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    var userData = {
      Username: user.username,
      Pool: user.userPool,
    };
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    returnData = await new Promise((resolve, reject) => {

      cognitoUser.confirmRegistration(user.verificationCode, true, function(err, result) {
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

module.exports.resendConfirmationCode = async (event: { body: string; }) => {

  const body = JSON.parse(event.body);
  let user:User = Object.assign(new User(), body);

    var returnData = {}

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    var userData = {
      Username: user.username,
      Pool: user.userPool,
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

module.exports.auth = async (event: { body: string; }) => {

  const body = JSON.parse(event.body);
  let user:User = Object.assign(new User(), body);

    var returnData = {}

    var authenticationData = {
      Username: user.username,
      Password: user.password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    var userData = {
      Username: user.username,
      Pool: user.userPool,
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

module.exports.isauth = async (event) => {

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: '🚀'
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

function buildAttributes(user:User){

    const {email,name,gender,birthdate,address} = user;

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

    