'use strict';
const AWS = require('aws-sdk');
const passwordValidator = require('password-validator');
const emailValidator = require("email-validator");
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

module.exports.main = async (event) => {

  const body = JSON.parse(event.body);
  const {username,email,password} = body;

  if(checkEmail(email) && checkPassword(password)){

    var returnData = {}

    var attributeList = buildAttributes(body);
    
    const poolData = {    
      UserPoolId : process.env.POOL_ID,
      ClientId : process.env.CLIENT_ID 
    }; 

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

    