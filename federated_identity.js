'use strict'
var http  = require('http'),
    https = require('https'),
    aws4  = require('aws4');
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
        //console.log('access token + ' + JSON.stringify(jwt_decode(result.getAccessToken().getJwtToken())));
        //console.log('Id token + ' + JSON.stringify(jwt_decode(result.getIdToken().getJwtToken())));
        getAWSCredentials(result.getIdToken().getJwtToken());

        queryApi(AWS.config.credentials);
    },

    onFailure: function(err) {
        console.error(err);
    }
});


function getAWSCredentials(idToken) {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:ea8fe71c-f3b9-4305-a2ed-95f8f6eed9a3',
        Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_McZZVzio6': idToken
        }
    });
}

function queryApi(credentials) {

    const options = {
      service: 'execute-api',
      region: 'us-east-1',
      url: "https://nnsomxxtq6.execute-api.us-east-1.amazonaws.com/api/admin",
      hostname: 'nnsomxxtq6.execute-api.us-east-1.amazonaws.com',
      path: '/api/admin',
      method: 'GET',
      headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    aws4.sign(options);    
    https.request(options, function(res) { res.pipe(process.stdout); }).end()
}
