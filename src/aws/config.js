import Amplify, { Auth } from 'aws-amplify';
import {cognitoConfig} from './../awsConfig/aws-cognito';
const getAWSConfig = function(){
    Amplify.configure({
        Auth: cognitoConfig
    })
    return Auth.configure();
}

module.exports.awsConfig = getAWSConfig;