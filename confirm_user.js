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

//Confirm User
var userData = {
    Username: 'johns',
    Pool: userPool
};

var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

cognitoUser.confirmRegistration('096146', true, function(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('call result: ' + result);
});