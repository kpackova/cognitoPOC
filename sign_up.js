'use strict'

const AWS = require('aws-sdk');

var CognitoSDK = require('amazon-cognito-identity-js-node');
require('amazon-cognito-js');

AWS.config.region = 'us-east-1';

AWS.CognitoIdentityServiceProvider.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;
AWS.CognitoIdentityServiceProvider.CognitoUserAttribute = CognitoSDK.CognitoUserAttribute;

const poolData = {
    UserPoolId: 'us-east-1_McZZVzio6',
    ClientId: '1pae6luqlhfofjvj7g61ctq1d7'
};

const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);


//Sign up


var attributeList = [];


var attributeName = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute('name','John Smith');
var attributeAddress =new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute('address','Some beautiful street 123');
var attributeEmail =new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute('email','katerina.packova@interworks.com.mk');

attributeList.push(attributeName);
attributeList.push(attributeAddress);
attributeList.push(attributeEmail);

var cognitoUser;
userPool.signUp('johns', 'S#cret123', attributeList, null, function(err, result){
    if (err) {
        console.log(err);
        return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
});
