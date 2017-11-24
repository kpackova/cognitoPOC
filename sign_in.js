'use strict'

const AWS = require('aws-sdk');

var CognitoSDK = require('amazon-cognito-identity-js-node');
require('amazon-cognito-js');
var jwt_decode = require('jwt-decode');

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


var authenticationData = {
    Username: 'johns',
    Password: 'S#cret321'
};

var userData = {
    Username: 'johns',
    Pool: userPool
};

var authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
        console.log('access token + ' + JSON.stringify(jwt_decode(result.getAccessToken().getJwtToken())));
        console.log('Id token + ' + JSON.stringify(jwt_decode(result.getIdToken().getJwtToken())));
        console.log('Refresh token + ' + JSON.stringify(result.getRefreshToken().getToken()));
    },

    onFailure: function(err) {
        console.error(err);
    }
});